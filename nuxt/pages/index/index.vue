<script lang="ts" setup>
import type {Ref} from "vue";

interface Appeal {
  author: string,
  title: string
  body: string
}

interface RequestState {
  state: string;
  error: any;
  value: any;
}

const errorState: Ref<boolean> = useState("error", () => false);
const model: Ref<Appeal> = useState("appeal", () => {
  return {
    author: "",
    title: "",
    body: ""
  }
});
const state: Ref<RequestState> = useState("request", () => {
  return {
    state: "",
    error: null,
    value: null,
  }
});

const sendAppeal = async () => {
  const {data, error, pending} = await useFetch("appeal", {
    baseURL: "http://bulbaman.me:16001",
    method: "POST",
    retry: false,
    body: JSON.stringify(model.value),
    server: false
  });
  if (error) {
    errorState.value = true;
    return;
  }
  const res = data.value;
  console.log(res);
}
</script>

<template>
  <ClientOnly>
    <UContainer class="pt-2">
      <h1 class="text-3xl text-center mb-5">Обращения граждан!</h1>
      <UForm :state="model" class="flex flex-col justify-center items-center p-4">
        <UFormGroup class="w-full" label="Представьтесь">
          <UInput v-model="model.author"/>
        </UFormGroup>

        <UFormGroup class="w-full mt-3" label="Ваше обращение">
          <UTextarea v-model="model.body" autoresize/>
        </UFormGroup>
        <UButton class="flex justify-center mt-3" @click.prevent="sendAppeal">Отправить</UButton>
      </UForm>
    </UContainer>
  </ClientOnly>
  <Teleport v-if="errorState" to="body">
    <UAlert title="Ошибка">
      <p>Произошла ошибка при отправке запроса: {{}}</p>
    </UAlert>
  </Teleport>
</template>

<style scoped>
</style>
