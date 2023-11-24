<template>
  <main class="grid md:grid-cols-[auto_1fr] grid-cols-[1fr] w-screen h-screen main p-6">
    <UContainer class="flex sm:flex-col flex-row md:justify-start">
      <ULink active-class="text-primary" class="link" to="/">Обращения</ULink>
      <ULink active-class="text-primary" class="link" to="/admin">Админ-панель</ULink>
    </UContainer>
    <div>
      <slot/>
    </div>
  </main>
</template>

<style scoped>
.link {
  @apply text-xl;
}
</style>
