<template>
  <div>
    <RouterLink to="/dashboard/notes" class="mb-4 inline-block text-blue-600 hover:underline"
      >← Back to Notes</RouterLink
    >
    <div v-if="note">
      <h1 class="mb-4 text-2xl font-bold">{{ note.title }}</h1>
      <p class="whitespace-pre-wrap text-gray-700">{{ note.content }}</p>
      <p class="mt-4 text-sm text-gray-400">Last updated: {{ formatDate(note.updatedAt) }}</p>
    </div>
    <div v-else-if="loading">Loading note...</div>
    <div v-else>Note not found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getNoteById } from '@/api/notes';

const route = useRoute();
const note = ref(null);
const loading = ref(true);

const fetchNote = async () => {
  try {
    note.value = await getNoteById(route.params.id);
  } catch (err) {
    console.error('Failed to fetch note:', err);
  } finally {
    loading.value = false;
  }
};

const formatDate = (iso) => new Date(iso).toLocaleString();

onMounted(fetchNote);
</script>
