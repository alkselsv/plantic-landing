<template>
  <section
    class="card"
  >
    <slot/>
    <div ref="lighter" class="lighter-wrap" :style="[style]"></div>
  </section>
</template>

<script lang="ts" setup>

import {reactive, ref} from "vue";

const style = reactive({
  top:  "0",
  left: "0",
  display: "none"
})

const lighter = ref<HTMLDivElement>()
const hideLighter = () => {
  // style.display = "none"
}
// @mousemove="onMouse"
// @mouseleave="hideLighter"
const onMouse = (event: PointerEvent) => {
  console.log(event.pageY, event.pageX)
  style.top = `${event.clientY}px`
  style.left = `${event.clientX}px`
  // style.top = `${event.pageY}px`
  // style.left = `${event.pageX}px`
  style.display = `block`

  //   top:  event.y,
  //   left: event.x
  // }
  // console.log(style.value)
  // lighter.value?.style?.top =
  // lighter.value?.style?.left =
}
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  background: hsla(0,0%,100%,0.1);
  padding: 50px 30px;
  border-radius: 10px;
  border: 1px solid rgba(87, 217, 160, 0.1);
  @media (max-width: 1024px) {
    padding: 40px 20px;
  };
}
.lighter-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100px;
  width: 100px;
  background-color: red;
  //background: radial-gradient( rgb(79, 20, 204) 0%, rgba(79, 20, 204, 0) 10px) no-repeat border-box border-box rgba(255, 255, 255, 0);
}


//.mouse-cursor-gradient-tracking {
//  position: relative;
//  width: 100%;
//  height: 100%;
//}
//
//.mouse-cursor-gradient-tracking:before {
//  --size: 0;
//  content: '';
//  position: absolute;
//  width: 100%;
//  height: 100%;
//  background: radial-gradient(circle at var(--x) var(--y), rgb(79, 20, 204) 0%, rgba(79, 20, 204, 0) var(--size)) no-repeat border-box border-box rgba(255, 255, 255, 0.1);
//}
//
//.mouse-cursor-gradient-tracking:hover:before {
//  --size: 150px;
//}

</style>
