<template>
  <section v-show="loaded" class="landing-layout">
    <p-header :element="contactFormElement"/>
    <main class="main-page__block-wrap">

      <section class="landing__row">
        <article class="landing__section">
          <h3 class="main-page__title" v-html="t('title_1')"/>
          <p class="main-page__text">
            {{ t('description_1') }}
          </p>
        </article>
        <article class="landing__section landing-image">
          <img v-if="locale === 'en'" src="./assets/background-plant-en.webp" alt="Image" rel="preload">
          <img v-else src="./assets/background-plant-ru.webp" alt="Image" rel="preload">
        </article>
      </section>

      <section class="landing__row landing__row_hidden">
        <article class="landing__section landing-video">
          <video v-if="locale === 'en'" key="en" ref="promoVideo" muted autoplay playsinline>
            <source src="/src/assets/rust-en.mp4" type="video/mp4"  rel="preload">
          </video>
          <video v-else key="ru" ref="promoVideo" muted autoplay playsinline>
            <source src="/src/assets/rust-ru.mp4" type="video/mp4"  rel="preload">
          </video>
        </article>
        <article class="landing__section">
          <h3 class="main-page__title" v-html="t('title_2')"/>
          <p class="main-page__text">
            {{ t('description_2') }}
          </p>
        </article>
      </section>

      <!-- <section class="landing__row landing__row_mobile-reverse landing__row_hidden">
        <article class="landing__section">
          <h3 class="main-page__title" v-html="t('title_3')"/>
          <p class="main-page__text">
            {{ t('description_3') }}
          </p>
        </article>
        <article class="landing__section">
          <image-upload class="landing-upload"/>
        </article>
      </section> -->

      <section class="landing__row landing__row_hidden">
        <article class="landing__section landing-mobile-image">
          <img src="./assets/mobile-app.webp" alt="Mobile app">
        </article>

        <article class="landing__section">
          <h3 class="main-page__title">
            <span class="main-page__title_colored">
              {{t('title_4')}}
            </span>
            <span class="bage">{{t('coming_soon')}}</span>
          </h3>
          <p class="main-page__text">
            {{ t('description_4') }}
          </p>
        </article>
      </section>


      <section ref="contactFormElement" class="landing__row landing__row_hidden">
        <article class="landing__section mobile-hide">
          <h3 class="main-page__title" v-html="t('title_5')"/>
          <div>
            <h3 class="main-page__text">{{ t('description_5') }}</h3>
            <a class="main-page__text" href="mailto:in@plantic.tech">in@plantic.tech</a>
          </div>
        </article>
        <article class="landing__section">
          <contact-form class="landing__contact-form"/>
        </article>
      </section>
    </main>
    <footer class="landing__footer landing__row_hidden">
      <span class="">© 2022 <a href="https://plantic.tech" class="">PLANTIC TECHNOLOGY LLC</a>.</span>
    </footer>
  </section>
</template>

<script lang="ts" setup>
import PHeader from "./components/PHeader.vue"
import {onUnmounted, onMounted, ref, computed} from 'vue';
import ContactForm from "./components/ContactForm.vue";
import ImageUpload from "./components/ImageUpload.vue";
import {useI18n} from "vue-i18n";
import useAssets from "./utils";


const promoVideo = ref<HTMLVideoElement>();

const loaded = ref<boolean>(true); // todo: later false
const assets = useAssets()
const { t, locale } = useI18n()

const observer = ref();
const contactFormElement = ref<HTMLElement>();

const onElementObserved = (entries: IntersectionObserverEntry[], obs: IntersectionObserver) => {
  entries.forEach(({target, isIntersecting}) => {
    if (isIntersecting) {
      target.classList.remove('landing__row_hidden');
      obs.unobserve(target);
    }
  });
};
onMounted(() => {
  observer.value = new IntersectionObserver(onElementObserved, {
    threshold: 0.6,
  });
  document.querySelectorAll('.landing__row_hidden').forEach(
      (el) => {
        observer.value.observe(el)
      },
  );
});

onUnmounted(() => observer.value.disconnect());

const video = computed(() => {
  return assets.videos[`/src/assets/rust-${locale.value}.mp4`].default
})

</script>

<style lang="scss">
@import "assets/styles/mixins";

.landing-image {
  overflow: hidden;
  position: absolute;
  z-index: 1;
  right: -40px;
  top: 5%;
  & > img {
    width: 150%;
  }
  @include before-desktop-mq {
    right: -20px;
    top: -15%;
    & > img {
      width: 250%;
      position: relative;
      left: -100px;
    }
  }
}

.landing-video {
  border-radius: 10px;
  overflow: hidden;
  align-items: center;
  display: flex;
  transform: translate3d(0, 0, 0);
  & > video {
    width: 100%;
  }
}



.landing-mobile-image {

  & > img {
    width: 100%;
  }

}

.image {
  border-radius: 10px;
}

.padding20_0 {
  @include for-desktop-up {
    padding: 80px 0;
  }
}

.desktop-hide {
  @media (min-width: 1025px) {
    display: none;
  }
}

.mobile-hide {
  @media (max-width: 1024px) {
    display: none;
  }
}

.bage {
  background: #f35757;
  border-radius: 5px;
  margin: 0 10px;
  padding: 3px 10px;
  font-size: 15px;
  font-weight: normal;
  position: relative;
  top: -4px;
  @media (min-width: 1025px) {
    margin: 0 15px;
    top: -20px;
  }
}

.landing {

  &__contact-form {
    margin-bottom: 40px;
    &-wrap {
      padding: 10px 0 30px 0;
    }
  }
  &__contact-text {
    font-weight: normal;
    font-size: 22px;
    text-decoration: none;
    color: white;
  }

  &__image-background {
    height: 100%;
    background: url("./assets/background-plant.webp");
    background-size: 200%;
    position: relative;
    right: -40px;
    top: -40px;
  }

  &__footer {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 20px;
    background-color: rgba(19, 19, 19, 0.2);
    color: white;
    //z-index: 4;
    //position: relative;

    & a {
      text-decoration: none;
    }

    & > span >  a {
      color: white;
    }
    & > span >  a:visited {
      color: white;
    }
  }
  &__section {

    width: 50%;
    @media (max-width: 1024px) {
      width: 100%;
      flex-direction: column-reverse;
      &:nth-child(2) {
      }
    }
  }
  &__row {
    display: flex;
    align-items: center;
    height: 100vh;
    @media (max-width: 1024px) {
      height: unset;
      &:nth-child(1) {
        height: 100vh;
      }
      &:not(&:last-child) {
        margin-bottom: 70px;
      }
    }
    gap: 50px;
    opacity: 1;
    transition: all 0.5s;
    transform: scale(1);
    &_hidden {
      opacity: 0;
      transform: scale(0.9);
    }

    &_reverse {
      flex-direction: row-reverse;
    }
    @media (max-width: 1024px) {
      flex-direction: column;
      justify-content: center;
    }

    &:first-child {
      justify-content: start;
      @media (max-width: 1024px) {
        height: calc(100vh - 64px - 20px);
        justify-content: end;
        //flex-direction: column-reverse;
      }


      & .landing__section:first-child {
        display: flex;
        flex-direction: column;
        //justify-content: center;
        //align-items: center;
      }
    }
    &_mobile-reverse {
      @media (max-width: 1024px) {
        flex-direction: column-reverse;
      }
    }
  }

  &__column_reverse {
    flex-direction: column;
  }
}

.main-page {
  width: 100%;
  &__block {
    position: relative;
    display: grid;
    @include for-tablet-portrait-up {
      gap: 50px;
    }
    @include for-desktop-up {
      grid-template-columns: repeat(2, 1fr);
      gap: 100px;
    }
    gap: 20px;
    opacity: 1;
    transition: all 0.5s;
    transform: scale(1);

    &-wrap {
      grid-template-columns: 1fr;
      column-gap: 80px;
      padding: 20px;
      @include for-desktop-up {
        padding: 40px;
        grid-auto-rows: 100vh;
        grid-template-columns: repeat(2, 1fr);
      }
    }

    &_right {
      flex-direction: row-reverse;
    }

    &_left {
      flex-direction: row;
    }
  }
  &__mobile-images {
    display: flex;
    flex-direction: row;
    gap: 20px
  }

  &__image_rounded {
    border-radius: 10px;
  }

  &__title {
    z-index: 2;
    @include for-desktop-up {
      font-size: 50px;
    }
    font-size: 40px;
    line-height: 110%;
    font-weight: 700;
    margin-bottom: 24px;

    &_colored {
      background: linear-gradient(45deg, #00DC82 0%, #36E4DA 50%, #0047E1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

  }

  &__text {
    z-index: 2;
    @include for-desktop-up {
      font-size: 24px;
    }
    font-size: 18px;
    line-height: 150%;
    font-weight: 500;
    color: white;
    &:visited {
      color: white;
    }
  }
}

.landing-layout {
  &__spotlight-wrapper {
    opacity: 0.5;
    transition: opacity 0.4s ease-in;
  }
}
</style>
