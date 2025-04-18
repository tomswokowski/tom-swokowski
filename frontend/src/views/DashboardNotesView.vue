<template>
  <div>
    <h1 class="mb-4 text-2xl font-bold">Notes</h1>

    <RouterLink
      to="/dashboard/notes/new"
      class="mb-6 inline-block rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
    >
      ➕ Create Note
    </RouterLink>

    <!-- Toast message -->
    <div v-if="toast" class="mb-4 rounded bg-green-100 px-4 py-2 text-green-800">
      {{ toast }}
    </div>

    <!-- Notes list -->
    <div v-if="loading">Loading notes...</div>
    <div v-else-if="notes.length === 0">No notes yet.</div>

    <ul v-else class="space-y-4">
      <li v-for="note in notes" :key="note.id" class="rounded border p-4 shadow-sm">
        <div class="flex items-start justify-between">
          <div>
            <h2 class="text-lg font-semibold">{{ note.title }}</h2>
            <p class="whitespace-pre-wrap text-gray-700">{{ note.content }}</p>
            <p class="mt-2 text-sm text-gray-400">Last updated: {{ formatDate(note.updatedAt) }}</p>
          </div>
          <div class="ml-4 flex flex-col gap-2 text-right">
            <RouterLink :to="`/dashboard/notes/${note.id}`" class="text-blue-600 hover:underline">
              View
            </RouterLink>
            <RouterLink
              :to="`/dashboard/notes/edit/${note.id}`"
              class="text-yellow-600 hover:underline"
            >
              Edit
            </RouterLink>
            <button @click="deleteNote(note.id)" class="text-red-600 hover:underline">
              Delete
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getAllNotes, deleteNote as apiDeleteNote } from '@/api/notes';

const notes = ref([]);
const loading = ref(true);
const toast = ref('');

const fetchNotes = async () => {
  loading.value = true;
  try {
    notes.value = await getAllNotes();
  } catch (err) {
    console.error('Failed to fetch notes:', err);
  } finally {
    loading.value = false;
  }
};

const deleteNote = async (id) => {
  if (!confirm('Are you sure you want to delete this note?')) return;
  try {
    await apiDeleteNote(id);
    await fetchNotes();
    toast.value = 'Note deleted!';
    setTimeout(() => (toast.value = ''), 3000);
  } catch (err) {
    console.error('Failed to delete note:', err);
  }
};

const formatDate = (iso) => new Date(iso).toLocaleString();

onMounted(fetchNotes);
</script>
