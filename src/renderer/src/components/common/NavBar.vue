<template>
  <div class="navbar mt-3">
    <div class="flex-1">
      <div class="flex flex-col">
        <div class="text-2xl font-bold">{{ title }}</div>
        <div v-if="subTitle" class="text-sm text-gray-500 mt-1">{{ subTitle }}</div>
      </div>
    </div>
    <div class="flex-none">
      <router-link v-show="prePath" :to="prePath" class="btn btn-sm text-black mr-2">
        <svg
          class="h-6 w-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
        </svg>
        <span>上一步</span>
      </router-link>

      <router-link v-show="nextPath" :to="nextPath" class="btn btn-success btn-sm text-white">
        <span>下一步</span>
        <svg
          class="h-6 w-6 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
        </svg>
      </router-link>
    </div>
  </div>
  <div class="bg-base-content/10 h-px mt-1 mb-4"></div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: false,
      default: ''
    },
    prePath: {
      type: String,
      required: false,
      default: ''
    },
    nextPath: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped></style>
