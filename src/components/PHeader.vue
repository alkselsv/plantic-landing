<template>
  <header ref="header" class="p-header p-header_blur">
    <div class="p-header__logo_wrap">
      <p-logo class="p-header__logo"/>
      <h2 class="p-header__logo-text">Plantic</h2>
    </div>
    <div class="p-header__right-menu">
      <p-button @click="changeLocale">{{ locale }}</p-button>
      <a class="p-header__contact-wrap">
        <p-button @click="scrollToContactForm">
          {{ t('contactUs') }}
        </p-button>
      </a>
    </div>
  </header>
</template>

<script lang="ts" setup>
import PButton from "../components/PButton.vue";
import PLogo from "./PLogo.vue";
import {useI18n} from "vue-i18n";

interface Props {
  element: any
}

const props = defineProps<Props>()
const { t, locale } = useI18n()

const scrollToContactForm = () => {
  props.element.scrollIntoView()
}
const changeLocale = () => {
  if (locale.value === 'en') {
    locale.value = 'ru'
  } else {
    locale.value = 'en'
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/mixins";
.p-header {
  z-index: 10;
  position: sticky;
  top: 0;
  height: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: #00000080;
  @include for-desktop-up {
    padding: 0 2rem;
  }
  &_blur {
    backdrop-filter: saturate(100%) blur(20px);
    -webkit-backdrop-filter: saturate(100%) blur(20px);
  }

  &__right-menu {
    display: flex;
    gap: 1rem;
  }

  &__logo_wrap {
    display: flex;
    align-items: center;
  }
  &__contact-wrap {
    @include before-desktop-mq {
      display: none;
    }
  }

  &__logo {
    height: 3rem;
    margin-right: 20px;
  }
  &__logo-text {
    //color: #6b5e4b;
    background: linear-gradient(45deg, #00DC82 0%, #36E4DA 50%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 27px;
    line-height: 110%;
    font-weight: 700;
  }
  //$btn-color: #736a5d;
  $btn-color: #68B0AB;
  &__button {
    background-color: transparent;
    box-sizing: border-box;
    transition-duration: 0.4s;
    border-radius: 100px;
    color: #fff5e3;
    font-weight: bold;
    &:focus {
      color: #fff5e3 !important;
    }
    &:hover {
      border: 2px solid $btn-color !important;
      color: $btn-color !important;
      &:focus {
        color: $btn-color !important;
      }
    }
  }
}

</style>
