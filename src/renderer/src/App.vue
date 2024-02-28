<template>
  <div class="h-screen">
    <div class="flex flex-col h-screen">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
</template>

<script>
// import { useCounterStore } from './stores/counter'

// export default {
//   setup() {
//     const counterStore = useCounterStore()

//     return { counterStore }
//   },
//   methods: {
//     addCounter() {
//       this.counterStore.increment()
//     }
//   }
// }
</script>
