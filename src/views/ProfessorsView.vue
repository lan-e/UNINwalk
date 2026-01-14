<template>
  <div class="search-container">
    <input
      id="searchBox"
      class="search-input"
      spellcheck="false"
      :placeholder="$t('search_input_message')"
      :value="inputText"
      @input="searchProfessors"
    />
    <button
      class="reset-input-button"
      @click="resetProfessors"
      :disabled="!inputText"
    >
      <Icon name="close" style="font-size: 20px" />
    </button>
  </div>
  <div class="professors-wrapper">
    <Professor
      v-for="professor in professorsList"
      :key="professor.name"
      :info="professor"
    />
  </div>
</template>

<script setup>
import Professor from "@/components/Professor.vue";
import { computed, ref } from "vue";
import { useGeneralStore } from "@/stores/general_store";
import Icon from "@/components/UI/Icon.vue";

const generalStore = useGeneralStore();
const inputText = ref("");

const professorsData = computed(() => {
  return generalStore.professors || [];
});

const professorsList = computed(() => {
  // show all if search is empty
  if (!inputText.value.trim()) {
    return professorsData.value;
  }

  const searchText = inputText.value.toLowerCase().trim();

  // split search into words for flexible matching
  const searchWords = searchText.split(/\s+/).filter((word) => word.length > 0);

  return professorsData.value.filter((professor) => {
    const professorName = professor.name.toLowerCase();
    const professorRoom = professor.room?.toString().toLowerCase() || "";

    // normalize room numbers by removing prefixes like "k-"
    const normalizedRoom = professorRoom.replace(/^[a-z]-/i, "");
    const normalizedSearch = searchText.replace(/^[a-z]-/i, "");

    // check if all search words appear in the name (in any order)
    const nameMatchesAllWords = searchWords.every((word) =>
      professorName.includes(word)
    );

    // also match if user types just the number and room has prefix
    const roomMatches =
      professorRoom.includes(searchText) ||
      normalizedRoom.startsWith(normalizedSearch) ||
      (professorRoom.includes("-") && professorRoom.endsWith("-" + searchText));

    return nameMatchesAllWords || roomMatches;
  });
});

function searchProfessors(event) {
  inputText.value = event.target.value;
}

function resetProfessors() {
  if (!inputText.value) return;
  inputText.value = "";
}
</script>
