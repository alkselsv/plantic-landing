<template>
  <p-card class="contact-form__wrap">
    <p class="contact-form__title" v-html="t('title_5_mobile')"/>
    <el-form ref="ruleFormRef" :hide-required-asterisk="true" :rules="rules" class="contact-form" :model="form" label-width="120px" label-position="top">
      <el-form-item :label="t('contact_form.name')" prop="name">
        <el-input :placeholder="t('contact_form.enter_name')" v-model="form.name" />
      </el-form-item>
      <el-form-item :label="t('contact_form.email')" prop="email">
        <el-input :placeholder="t('contact_form.enter_email')" v-model="form.email" />
      </el-form-item>
      <el-form-item :label="t('contact_form.message')" prop="message">
        <el-input
          v-model="form.message"
          :autosize="{ minRows: 4, maxRows: 6 }"
          :placeholder="t('contact_form.enter_message')"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button v-if="!sended" @click="onSubmit(ruleFormRef)">
          {{ t('contact_form.send') }}
        </el-button>
        <el-button v-else :disabled="true">
          {{ t('contact_form.sent') }}
        </el-button>
      </el-form-item>
    </el-form>
  </p-card>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue"
import {ElButton, ElFormItem, ElForm, ElInput, FormRules, FormInstance} from "element-plus"
import PCard from "./PCard.vue";
import {useI18n} from "vue-i18n";

const ruleFormRef = ref<FormInstance>()

const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  message: '',
});

const sended = ref(false)

const rules = reactive<FormRules>({
  name: [
    {required: true, message: t('validations.required_field'), trigger: 'blur'},
  ],
  email: [
    {required: true, message: t('validations.required_field'), trigger: 'blur'},
  ],
  message: [
    {required: true, message: t('validations.required_field'), trigger: 'blur'},
  ],
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      await fetch("https://plantic.tech/api/mailing/inbox", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })
      sended.value = true
    }
  })

};
</script>

<style lang="scss">
.contact-form {
  &__title {
    @media (min-width: 1025px) {
      display: none;
    }
    font-size: 25px;
    margin-bottom: 30px;
  }

  & .el-form-item__label {
    color: #c0c0c0;
  }
  & .el-input__wrapper, .el-textarea__inner {
    border: 2px solid rgba(87, 217, 160, 0.02);
    background-color: hsla(0,0%,50%,0.1);
    resize: none;
    box-shadow: none;
    color: #ffffff;
    & ::placeholder {
      color: #a2a2a2;
    }
    & .el-input__inner {
      color: #ffffff;
    }
  }

  & .el-button {
    width: 100%;
    background-color: #413F3FB2;
    border: none;
    //background: linear-gradient(45deg, #00DC82 0%, #36E4DA 50%, #0047E1 100%);
    //border: 1px solid #57D9A0FF;
    color: white;
    padding: 20px 0;

    transition: all 0.8s;

    &:hover {
      background-color: #333333B2;
    }
  }
}
//.contact-form {
//  .el-form-item__label {
//    font-size: 16px;
//    font-weight: bold;
//  }
//  .el-input {
//    height: 46px;
//    .el-input__wrapper {
//      //color: #fff5e3;
//      color: white;
//      background: #000;
//      box-shadow: none;
//      ::placeholder {
//        color: #dedede;
//        font-weight: bold;
//      }
//    }
//  }
//  .el-textarea__inner {
//    height: 180px;
//    background-color: transparent;
//    box-shadow: none;
//    //box-shadow: 0 0 0 1px #ccbfa8;;
//    color: #ffffff;
//    &:hover {
//      border: none;
//      box-shadow: none;
//    }
//    &::placeholder {
//      color: #ffffff;
//      font-weight: bold;
//    }
//    //&:focus {
//    //  box-shadow: 0 0 0 1px #ccbfa8;
//    //}
//    //&:hover {
//    //  box-shadow: 0 0 0 1px #ccbfa8;
//    //}
//  }
//  .el-button {
//    //background-color: red !important;
//    //background: #303030;
//    height: 46px;
//    width: 160px;
//    //border-radius: 100px;
//    background: transparent;
//    color: #ffffff;
//    border: none;
//    font-weight: bold;
//    //border: 2px solid #736a5d !important;
//    transition-duration: 0.4s;
//    &:focus {
//      color: #fff5e3 !important;
//
//    }
//    &:hover {
//      background: transparent;
//      color: #ffffff;
//    }
//  }
//}
</style>
