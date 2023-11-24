<script lang="ts" setup>
const nuxtApp = useNuxtApp();
const loading = ref(false);

nuxtApp.hook("page:start", () => {
  loading.value = true;
});
nuxtApp.hook("page:finish", () => {
  loading.value = false;
});
</script>

<template>
  <UModal v-model="loading" :ui="{background: 'transparent'}" appear prevent-close transition/>

  <main class="grid md:grid-cols-[auto_1fr] grid-cols-[1fr] w-screen h-screen main p-6">
    <UContainer class="flex sm:flex-col flex-row md:justify-start">
      <ULink active-class="text-primary" class="link" to="/">Обращения</ULink>
      <ULink active-class="text-primary" class="link" to="/admin">Админ-панель</ULink>
    </UContainer>
    <div>
      <slot/>
    </div>
  </main>

  <UNotifications/>
</template>

<style scoped>
.link {
  @apply text-xl;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
