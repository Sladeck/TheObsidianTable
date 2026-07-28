<script setup>
import { reactive, ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { InputText, Textarea, InputNumber, Select, AutoComplete, Chip, FileUpload, Button, Toast } from "primevue";
import { useToast } from "primevue/usetoast";
import AdminHeader from "@/components/AdminHeader.vue";
import { RestaurantService } from "@/service/RestaurantService";
import { resizeImageForUpload } from "@/utils/resizeImage";

const route = useRoute();
const router = useRouter();
const toast = useToast();

const isEditMode = computed(() => !!route.params.slug);

const form = reactive({
	name: "",
	slug: "",
	type: "",
	description: "",
	totalScore: 0,
	verdict: "",
	scores: { food: 0, atmo: 0, price: 0, service: 0 },
	location: { address: "", city: "", country: "", googleMapsUrl: "" },
	priceLevel: 1,
	priceNote: "",
	review: { food: "", atmo: "", service: "" },
	tags: [],
	images: [],
});

const priceLevelOptions = [
	{ label: "$", value: 1 },
	{ label: "$$", value: 2 },
	{ label: "$$$", value: 3 },
	{ label: "$$$$", value: 4 },
];

const slugManuallyEdited = ref(false);
const loading = ref(false);
const submitting = ref(false);
const uploading = ref(false);
const existingTags = ref([]);
const fileUploadRef = ref(null);

// Each item is either an already-uploaded image ({ url, file: null }) or a
// locally-picked one not yet sent to the server ({ url: null, file, previewUrl }).
// Order here is the carousel order. Pending files only actually reach the
// server on submit, so abandoning the form never leaves orphaned uploads.
const imageItems = ref([]);

function slugify(text) {
	return text
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

watch(
	() => form.name,
	(name) => {
		if (!slugManuallyEdited.value && !isEditMode.value) {
			form.slug = slugify(name);
		}
	},
);

function onSlugInput() {
	slugManuallyEdited.value = true;
}

watch(
	() => [form.scores.food, form.scores.atmo, form.scores.price, form.scores.service],
	([food, atmo, price, service]) => {
		const average = (Number(food) + Number(atmo) + Number(price) + Number(service)) / 4;
		form.totalScore = Math.round(average * 10) / 10;
	},
	{ immediate: true },
);

function addExistingTag(tag) {
	if (!form.tags.includes(tag)) form.tags.push(tag);
}

function formatMB(bytes) {
	return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

async function handleUpload(event) {
	uploading.value = true;
	try {
		const originalBytes = event.files.reduce((sum, file) => sum + file.size, 0);
		const processedFiles = await Promise.all(event.files.map(resizeImageForUpload));
		const processedBytes = processedFiles.reduce((sum, file) => sum + file.size, 0);

		for (const file of processedFiles) {
			imageItems.value.push({
				id: crypto.randomUUID(),
				url: null,
				file,
				previewUrl: URL.createObjectURL(file),
			});
		}

		toast.add({
			severity: "success",
			summary: `${processedFiles.length} photo${processedFiles.length > 1 ? "s" : ""} ready`,
			detail: `${formatMB(originalBytes)} → ${formatMB(processedBytes)} (uploaded when you save)`,
			life: 3500,
		});
	} catch (err) {
		toast.add({ severity: "error", summary: "Couldn't process photo", detail: err.message, life: 4000 });
	} finally {
		uploading.value = false;
		// customUpload leaves its own selected-files list showing "pending" otherwise.
		fileUploadRef.value?.clear();
	}
}

function removeImage(index) {
	const [removed] = imageItems.value.splice(index, 1);
	if (removed?.file) {
		URL.revokeObjectURL(removed.previewUrl);
	}
}

function moveImage(index, direction) {
	const target = index + direction;
	if (target < 0 || target >= imageItems.value.length) return;
	const items = imageItems.value;
	[items[index], items[target]] = [items[target], items[index]];
}

onMounted(async () => {
	if (isEditMode.value) {
		loading.value = true;
		try {
			const data = await RestaurantService.getRestaurantBySlug(route.params.slug);
			Object.assign(form, data);
			slugManuallyEdited.value = true;
			imageItems.value = data.images.map((url) => ({ id: crypto.randomUUID(), url, file: null, previewUrl: url }));
		} catch (err) {
			toast.add({ severity: "error", summary: "Failed to load restaurant", detail: err.message, life: 4000 });
		} finally {
			loading.value = false;
		}
	}

	try {
		const all = await RestaurantService.getRestaurants();
		existingTags.value = [...new Set(all.flatMap((r) => r.tags))].sort();
	} catch {
		// suggestions are a nice-to-have, ignore failures here
	}
});

onBeforeUnmount(() => {
	for (const item of imageItems.value) {
		if (item.file) URL.revokeObjectURL(item.previewUrl);
	}
});

async function submit() {
	submitting.value = true;
	try {
		const pending = imageItems.value.filter((item) => item.file);

		if (pending.length) {
			const uploadedUrls = await RestaurantService.uploadImages(pending.map((item) => item.file));
			pending.forEach((item, i) => {
				URL.revokeObjectURL(item.previewUrl);
				item.url = uploadedUrls[i];
				item.previewUrl = item.url;
				item.file = null;
			});
		}

		form.images = imageItems.value.map((item) => item.url);

		if (isEditMode.value) {
			await RestaurantService.updateRestaurant(route.params.slug, form);
			toast.add({ severity: "success", summary: "Saved", life: 2500 });
		} else {
			await RestaurantService.createRestaurant(form);
			toast.add({ severity: "success", summary: "Created", life: 2500 });
		}
		router.push("/admin");
	} catch (err) {
		toast.add({ severity: "error", summary: "Failed to save", detail: err.message, life: 5000 });
	} finally {
		submitting.value = false;
	}
}
</script>

<template>
	<div id="admin-form">
		<AdminHeader />
		<Toast />

		<div class="form-wrapper">
			<h2 class="playfair-display">{{ isEditMode ? "Edit Restaurant" : "New Restaurant" }}</h2>

			<p v-if="loading" class="hint">Loading...</p>

			<form v-else @submit.prevent="submit">
				<section class="form-section full-width">
					<h3>Basics</h3>
					<label>
						<span>Name</span>
						<InputText v-model="form.name" required />
					</label>
					<label>
						<span>Slug</span>
						<InputText v-model="form.slug" @input="onSlugInput" required />
					</label>
					<label>
						<span>Cuisine / Type</span>
						<InputText v-model="form.type" placeholder="French, Japanese, Fast Food..." required />
					</label>
					<label>
						<span>Description</span>
						<Textarea v-model="form.description" rows="3" required />
					</label>
					<label>
						<span>Final Verdict</span>
						<Textarea v-model="form.verdict" rows="3" required />
					</label>
				</section>

				<section class="form-section">
					<h3>Scores</h3>
					<div class="score-grid">
						<label>
							<span>Total Score (average)</span>
							<InputNumber v-model="form.totalScore" :min="0" :max="10" :step="0.1" mode="decimal" :minFractionDigits="1" :maxFractionDigits="1" disabled />
						</label>
						<label>
							<span>Food</span>
							<InputNumber v-model="form.scores.food" :min="0" :max="10" :step="0.1" mode="decimal" :minFractionDigits="1" :maxFractionDigits="1" />
						</label>
						<label>
							<span>Atmosphere</span>
							<InputNumber v-model="form.scores.atmo" :min="0" :max="10" :step="0.1" mode="decimal" :minFractionDigits="1" :maxFractionDigits="1" />
						</label>
						<label>
							<span>Price</span>
							<InputNumber v-model="form.scores.price" :min="0" :max="10" :step="0.1" mode="decimal" :minFractionDigits="1" :maxFractionDigits="1" />
						</label>
						<label>
							<span>Service</span>
							<InputNumber v-model="form.scores.service" :min="0" :max="10" :step="0.1" mode="decimal" :minFractionDigits="1" :maxFractionDigits="1" />
						</label>
					</div>
				</section>

				<section class="form-section">
					<h3>Location</h3>
					<label>
						<span>Address</span>
						<InputText v-model="form.location.address" required />
					</label>
					<div class="two-col">
						<label>
							<span>City</span>
							<InputText v-model="form.location.city" required />
						</label>
						<label>
							<span>Country</span>
							<InputText v-model="form.location.country" required />
						</label>
					</div>
					<label>
						<span>Google Maps URL</span>
						<InputText v-model="form.location.googleMapsUrl" required />
					</label>
				</section>

				<section class="form-section">
					<h3>Pricing</h3>
					<div class="two-col">
						<label>
							<span>Price Level</span>
							<Select v-model="form.priceLevel" :options="priceLevelOptions" optionLabel="label" optionValue="value" />
						</label>
						<label>
							<span>Price Note</span>
							<InputText v-model="form.priceNote" placeholder="Average $80/person" required />
						</label>
					</div>
				</section>

				<section class="form-section">
					<h3>Tags</h3>
					<AutoComplete v-model="form.tags" multiple :typeahead="false" placeholder="Type a tag and press Enter" />
					<div v-if="existingTags.length" class="tag-suggestions">
						<span class="tag-suggestions-label">Existing tags:</span>
						<Chip v-for="tag in existingTags" :key="tag" :label="tag" class="tag-chip" @click="addExistingTag(tag)" />
					</div>
				</section>

				<section class="form-section full-width">
					<h3>Review</h3>
					<label>
						<span>Quality</span>
						<Textarea v-model="form.review.food" rows="3" required />
					</label>
					<label>
						<span>Atmosphere</span>
						<Textarea v-model="form.review.atmo" rows="3" required />
					</label>
					<label>
						<span>Service &amp; Value</span>
						<Textarea v-model="form.review.service" rows="3" required />
					</label>
				</section>

				<section class="form-section full-width">
					<h3>Photos</h3>
					<FileUpload
						ref="fileUploadRef"
						name="images"
						customUpload
						multiple
						auto
						accept="image/*"
						:maxFileSize="25000000"
						chooseLabel="Add Photos"
						@uploader="handleUpload"
					/>
					<p v-if="uploading" class="hint">Compressing...</p>
					<p v-if="imageItems.length" class="hint">First photo is the carousel's opening image. Use the arrows to reorder.</p>
					<div v-if="imageItems.length" class="image-grid">
						<div v-for="(item, index) in imageItems" :key="item.id" class="image-preview">
							<span class="image-position">{{ index + 1 }}</span>
							<img :src="item.previewUrl" alt="" />
							<span v-if="item.file" class="image-pending-badge">pending</span>
							<button type="button" class="remove-image" @click="removeImage(index)">×</button>
							<div class="image-reorder">
								<button type="button" :disabled="index === 0" @click="moveImage(index, -1)">‹</button>
								<button type="button" :disabled="index === imageItems.length - 1" @click="moveImage(index, 1)">›</button>
							</div>
						</div>
					</div>
				</section>

				<div class="form-actions full-width">
					<Button type="submit" :label="isEditMode ? 'Save Changes' : 'Create Restaurant'" :loading="submitting" />
				</div>
			</form>
		</div>
	</div>
</template>

<style>
	#admin-form {
		min-height: 100vh;
		background-color: var(--BGBackground);

		.form-wrapper {
			max-width: 720px;
			margin: 0 auto;
			padding: 56px 24px 80px;

			> h2 {
				color: var(--WhiteAshes);
				font-size: 2rem;
				margin-bottom: 32px;
			}

			.hint {
				color: var(--TextMuted);
			}

			form {
				display: flex;
				flex-direction: column;
				gap: 24px;
			}

			.full-width {
				width: 100%;
			}

			.form-section {
				background-color: var(--BGCard);
				border: 1px solid var(--Stroke);
				border-radius: 4px;
				padding: 24px;
				display: flex;
				flex-direction: column;
				gap: 16px;

				h3 {
					color: var(--Obsidian);
					font-size: 1.1rem;
					margin-bottom: 4px;
				}

				label {
					display: flex;
					flex-direction: column;
					gap: 6px;
					font-size: 0.85rem;
					color: var(--TextMuted);
				}

				.p-inputtext, .p-textarea, .p-inputnumber, .p-select, .p-autocomplete {
					width: 100%;
				}

				.two-col {
					display: flex;
					flex-direction: column;
					gap: 16px;
				}

				.score-grid {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					gap: 16px;
				}

				.tag-suggestions {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					gap: 8px;
					margin-top: 8px;

					.tag-suggestions-label {
						font-size: 0.8rem;
						color: var(--TextFaint);
					}

					.tag-chip {
						cursor: pointer;
						background-color: var(--SectionOff);
						color: var(--TextMuted);
					}
				}

				.image-grid {
					display: flex;
					flex-wrap: wrap;
					gap: 12px;
					margin-top: 12px;

					.image-preview {
						position: relative;
						width: 100px;
						height: 100px;

						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
							border-radius: 4px;
							border: 1px solid var(--Stroke);
						}

						.image-position {
							position: absolute;
							top: 4px;
							left: 4px;
							min-width: 18px;
							padding: 1px 5px;
							border-radius: 999px;
							background-color: color-mix(in srgb, black 55%, transparent);
							color: var(--WhiteAshes);
							font-size: 0.7rem;
							text-align: center;
							line-height: 1.5;
						}

						.image-pending-badge {
							position: absolute;
							bottom: 4px;
							left: 4px;
							padding: 1px 6px;
							border-radius: 4px;
							background-color: color-mix(in srgb, black 55%, transparent);
							color: var(--ObsidianSoft);
							font-size: 0.65rem;
							text-transform: uppercase;
							letter-spacing: 0.03em;
						}

						.remove-image {
							position: absolute;
							top: -8px;
							right: -8px;
							width: 22px;
							height: 22px;
							border-radius: 50%;
							border: none;
							background-color: var(--Obsidian);
							color: var(--WhiteAshes);
							cursor: pointer;
							line-height: 1;
						}

						.image-reorder {
							position: absolute;
							bottom: 4px;
							right: 4px;
							display: flex;
							gap: 2px;

							button {
								width: 20px;
								height: 20px;
								border: none;
								border-radius: 3px;
								background-color: color-mix(in srgb, black 55%, transparent);
								color: var(--WhiteAshes);
								cursor: pointer;
								line-height: 1;
								font-size: 0.9rem;

								&:disabled {
									opacity: 0.3;
									cursor: default;
								}
							}
						}
					}
				}
			}

			.form-actions {
				display: flex;
				justify-content: flex-end;

				.p-button {
					background-color: var(--Obsidian);
					border-color: var(--Obsidian);
				}
			}
		}
	}

	@media (min-width: 768px) {
		#admin-form {
			.form-wrapper {
				max-width: 900px;

				form {
					display: grid;
					grid-template-columns: 1fr 1fr;
					align-items: start;
					gap: 24px;
				}

				.full-width {
					grid-column: 1 / -1;
				}

				.form-section {
					.two-col {
						flex-direction: row;

						> label {
							flex: 1;
						}
					}
				}
			}
		}
	}
</style>
