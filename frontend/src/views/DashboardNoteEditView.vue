<template>
  <div>
    <RouterLink to="/dashboard/notes" class="mb-4 inline-block text-blue-600 hover:underline">
      ← Back to Notes
    </RouterLink>

    <h1 class="mb-4 text-2xl font-bold">Edit Note</h1>

    <form @submit.prevent="handleUpdateNote" class="space-y-4" v-if="loaded">
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Title</label>
        <input v-model="note.title" type="text" class="w-full rounded border px-3 py-2" required />
      </div>
      <div>
        <label class="mb-1 block text-sm font-medium text-gray-700">Content</label>
        <textarea
          v-model="note.content"
          rows="6"
          class="w-full rounded border px-3 py-2"
          required
        ></textarea>
      </div>
      <button type="submit" class="rounded bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-700">
        Save Changes
      </button>
    </form>

    <div v-else>Loading note...</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getNoteById, updateNote } from '@/api/notes';

const route = useRoute();
const router = useRouter();

const note = ref({ title: '', content: '' });
const loaded = ref(false);

onMounted(async () => {
  try {
    const data = await getNoteById(route.params.id);
    note.value = data;
    loaded.value = true;
  } catch (err) {
    console.error('Failed to load note:', err);
  }
});

const handleUpdateNote = async () => {
  try {
    await updateNote(route.params.id, note.value);
    router.push(`/dashboard/notes/${route.params.id}`);
  } catch (err) {
    console.error('Failed to update note:', err);
  }
};
</script>
