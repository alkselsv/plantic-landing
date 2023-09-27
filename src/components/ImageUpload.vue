<template>
  <p-card class="image-upload_wrap">
    <section class="image-upload" @click="chooseImage"
             @dragover.prevent
             @dragleave.prevent
             @drop.prevent="dropImage"
             @mouseenter="onShowDeleteBtn"
             @mouseleave="onShowDeleteBtn"
    >
      <img v-if="currentImage" class="image-upload__image" :src="currentImage" alt="image">
      <section v-else class="image-upload__drag-zone">
        <el-icon class="image-upload__upload-icon"><upload-filled /></el-icon>
        <p v-if="isLargeScreen">{{t('image_form_text')}}</p>
        <p v-else>{{t('image_form_text_mobile')}}</p>
      </section>
      <Transition name="fade">
        <section v-if="showDeleteBtn" class="image-upload_delete" @click.stop="deleteImage">
          <el-icon class="image-upload__delete-icon"><delete/></el-icon>
        </section>
      </Transition>
    </section>
    <section v-if="loadingResult" class="image-upload__loader-wrap">
      <grid-loader/>
    </section>
    <div v-if="imageDiseases.length > 0" class="image-upload__tags-wrap">
      <span v-for="name in imageDiseases" class="image-upload__tag">
        {{ name }}
      </span>
    </div>
    <input
      ref="imageInput"
      class="image-upload__input"
      type="file" accept="image/jpeg, image/png"
      alt="image"
      @change="changeImage"
    />
  </p-card>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { UploadFilled, Delete } from '@element-plus/icons-vue'
import PCard from "./PCard.vue";
import GridLoader from "./GridSpinner.vue";
import {useMediaQuery} from "@vueuse/core"
import {useI18n} from "vue-i18n";

const imageInput = ref<HTMLInputElement>()

const showDeleteBtn = ref<boolean>(false)
const loadingResult = ref<boolean>(false)
const currentImage = ref<string>()
const imageDiseases = ref<string[]>([])
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
const { t } = useI18n()

const chooseImage = () => {
  imageInput.value?.click()
}

const onShowDeleteBtn = () => {
  if (currentImage.value) {
    showDeleteBtn.value = !showDeleteBtn.value
  }
}

const uploadImage = async (image: File) => {
  const formData  = new FormData()
  formData.append("images", image)
  const result = await fetch("https://plantic.tech/api/prediction", {
    method: "POST",
    body: formData,
  })
  imageDiseases.value = (await result.json())["diseases"]
  loadingResult.value = false
}

const dropImage = async (event: DragEvent) => {
  loadingResult.value = true
  const file = event?.dataTransfer?.files?.item(0)
  if (file) {
    await uploadImage(file)
    currentImage.value = URL.createObjectURL(<Blob>file)
  }
}

const changeImage = async () => {
  loadingResult.value = true
  const file = imageInput.value?.files?.item(0)
  if (file) {
    await uploadImage(file)
    currentImage.value = URL.createObjectURL(<Blob>file)
  }
}

const deleteImage = async () => {
  showDeleteBtn.value = false
  currentImage.value = undefined
  imageDiseases.value = []
}


</script>

<style lang="scss">
.image-upload {
  border: 5px dashed #2f2f2f;
  border-radius: 10px;
  width: 100%;
  height: 400px;
  overflow: hidden;
  object-fit: cover;
  cursor: pointer;
  position: relative;
  &_wrap {
    position: relative;
    overflow: hidden;
  }
  &__input {
    display: none;
  }
  &__image {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
  &__tags-wrap {
    display: flex;
    gap: 20px;
    width: 100%;
    height: 35px;
    overflow-x: scroll;
    scrollbar-width: none;
    cursor: ew-resize;
    margin-top: 20px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__tag {
    display: flex;
    align-items: center;
    padding: 0 8px;
    background-color: #f64444;
    border-radius: 5px;
  }
  &__drag-zone {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    font-size: 20px;
    padding: 20px;
    text-align: center;
  }
  &__upload-icon {
    font-size: 150px;
  }
  &__delete-icon {
    font-size: 100px;
  }
  &_delete {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(17, 17, 17, 0.7);
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #D2D2D2FF;
  }
  &__loader-wrap {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(17, 17, 17, 0.95);
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
