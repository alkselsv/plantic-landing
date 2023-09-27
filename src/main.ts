import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/styles/index.scss'
import App from './App.vue'
import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    contactUs: 'Contact us',
    title_1: 'Detecting <span class="main-page__title_colored">plant diseases</span>',
    description_1: 'We increase the accuracy and efficiency of determining diseases of fruit and grain crops from photographs of leaves and crops.',
    title_2: 'Artificial <span class="main-page__title_colored">Intelligence Techniques</span>',
    description_2: 'We use modern deep learning methods, providing quality metrics F1>80% and Accuracy>90%.',
    title_3: '<span class="main-page__title_colored">API</span> photo processing',
    description_3: 'Email us for details on getting access.',
    title_4: 'Mobile app',
    description_4: 'The app generates a list of care recommendations, schedules work, stores disease history and treatment results.',
    title_5: 'Start working with us <span class="main-page__title_colored">now</span>',
    title_5_mobile: 'Start working with us now',
    description_5: 'Contact us for all your questions',
    coming_soon: 'Coming soon',
    image_form_text: 'Move image here or click',
    image_form_text_mobile: 'Move image here or click',
    contact_form: {
      name: 'Your name',
      enter_name: 'Enter your name',
      email: 'Email',
      enter_email: 'Enter your email address',
      message: 'Message',
      enter_message: 'Write what you want to discuss',
      send: 'Send',
      sent: 'Sent',
    },
    validations: {
      required_field: 'Required field',
    }
  },
  ru: {
    contactUs: 'Связаться',
    title_1: 'Определяем <span class="main-page__title_colored">заболевания растений<span>',
    description_1: 'Повышаем точность и оперативность определения заболеваний плодовых и зерновых культур по фотографиям листьев и посевов.',
    title_2: 'Методы <span class="main-page__title_colored">искусственного интеллекта</span>',
    description_2: 'Используем современные методы глубокого обучения, обеспечивая метрики качества F1>80% и Accuracy>90%.',
    title_3: 'Обработка ваших фотографий по <span class="main-page__title_colored">API</span>',
    description_3: 'Напишите нам, для уточнения деталей получения доступа.',
    title_4: 'Мобильное приложение',
    description_4: 'Формирует список рекомендаций по уходу, планирует проведение работ, хранит историю заболеваний и результатов лечения.',
    title_5: 'Начни работать с нами <span class="main-page__title_colored">прямо сейчас</span>',
    title_5_mobile: 'Начни работать с нами прямо сейчас',
    description_5: 'Контакт по всем вопросам',
    coming_soon: 'Скоро',
    image_form_text: 'Переместите изображение сюда или кликните',
    image_form_text_mobile: 'Сделайте фото или выберете из галереи',
    contact_form: {
      name: 'Ваше имя',
      enter_name: 'Введите ваше имя',
      email: 'Email',
      enter_email: 'Введите ваш e-mail адрес',
      message: 'Сообщение',
      enter_message: 'Напишите, что хотите обсудить',
      send: 'Отправить',
      sent: 'Отправлено',
    },
    validations: {
      required_field: 'Обязательное поле',
    }
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages,
})

const app = createApp(App)

app.use(ElementPlus).use(i18n).mount('#app')

