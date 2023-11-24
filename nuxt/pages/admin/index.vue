<script lang="ts" setup>
import type {Appeal} from "~/domain/Appeal";
import type {Ref} from "vue";
import {useAsyncData} from "#app";

const columns = [
  {
    key: 'executor',
    label: 'Исполнитель',
    sortable: true
  }, {
    key: 'theme',
    label: 'Тема',
    sortable: true
  }, {
    key: 'subTheme',
    label: 'Группа тем',
    sortable: true
  },
];

// const appeals: Ref<Appeal[]> = ref([]);
const errorState: Ref<string | undefined> = ref(undefined);

const {data: appeals, error} = await useAsyncData<Appeal[]>("appeal", () => $fetch('appeal', {
  baseURL: "http://bulbaman.me:16001",
}));
if (error.value) errorState.value = error.value.message;
</script>

<template>
  <UContainer class="pt-5">
    <h1 class="text-3xl text-center mb-5">Админ-панель</h1>
    <UTable :columns="columns" :rows="appeals ?? []" :sort="{column: '', direction: 'asc'}"/>
  </UContainer>

  <Teleport v-if="errorState" to="body">
    <UAlert title="Ошибка">
      <p>Произошла ошибка при отправке запроса: {{ errorState }}</p>
    </UAlert>
  </Teleport>
</template>

<style scoped>

</style>
