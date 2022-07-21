<template>
 <PageComponent>
   <template v-slot:header>
     <div class="flex items-center justify-between">
       <div class="text 3xl font-bold text-gray-900">
         {{ route.params.id ? model.title : "Create Survey" }}
       </div>
       <button
       v-if="route.params.id"
       @click="deleteSurvey"
       type="button"
       class="py-2 px-4 text-white bg-red-500 rounded-md"
       >
        Delete
        
       </button>
     </div>
   </template>
   <div class="flex justify-center" v-if="surveyLoading">Loading</div>
   <form @submit.prevent="saveSurvey" v-else class="animate-fade-in-down">
     <div class="shadow sm:rounded-md sm:overflow-hidden">
       <!-- Survey Field -->
       <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
         <div>
           <label for="" class="block text-sm font-medium text-gray-700">
             Image
           </label>
           <div class="mt-1 flex items-center">
             <img

             v-if="model.image_url"
             :src="model.image_url"
             :alt="model.title"
             class="w-64 h-48 object-cover"
             />
             <span
             v-else
             class="
             flex
             items-center
             justify-center
             h-12
             w-12
             rounded-full
             overflow-hidden
             bg-gray-100"
             >
             <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-[80%] w-[80%] text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
             </span>
             <button
             type="button"
             class="
             relative
             overflow-hidden
             ml-5
             bg-white
             py-2
             px-3
             border border-gray-300
             rounded-md
             shadow-sm
             text-sm
             leading-4
             font-medium
             text-gray-700
             hover:bg-gray-50
             focus:outline-none
             focus:ring-2
             focus:ring-offset-2
             focus:ring-indigo-500"
             >
             <input type="file"
              @change="onImageChoose"
             class="
             absolute
             left-0
             top-0
             right-0
             bottom-0
             opacity-0
             cursor-pointer"/>
              Change
             </button>
           </div>
         </div>
        <!-- Image -->

        <!-- title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" name="title" id="title" v-model="model.title" autocomplete="survey_title"
          class="
          mt-1
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          shadow-sm
          sm:text-sm
          border-gray-300
          rounded-md"
          />
        </div>
        <!-- end title -->
        <!-- Description -->
        <div class="mt-1">
          <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
          <textarea rows="3" type="text" name="description" id="description" v-model="model.description" autocomplete="survey_description"
          placeholder="Describe your survey"
          class="
          mt-1
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          shadow-sm
          sm:text-sm
          border-gray-300
          rounded-md"
          />
        </div>
        <!-- end description -->

        <!-- expired date -->
        <div>
           <label for="expired_date" class="block text-sm font-medium text-gray-700">Expire Date</label>
           <input type="date"
           name="expire_date"
           id="expire_date"
           v-model="model.expire_date"
           class="
            mt-1
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          shadow-sm
          sm:text-sm
          border-gray-300
          rounded-md"
           />
        </div>
        <!-- end expored date -->
        <!-- status -->
        <div class="flex flex-items-start">
            <div class="flex flex-items h-5">
              <input type="checkbox"
              id="status"
              name="status"
              v-model="model.status"
              class="
              focus:ring-indigo-500
              h-4
              w-4
              text-indigo-600
              border-gray-600
              rounded"
              />
            </div>
          <div class="ml-3 text-sm">
            <label for="status" class="font-medium text-gray-700">Active</label>
          </div>
        </div>
        <!-- end status -->
       </div>


        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <h3 class="text-2xl font-semibold flex items-center justify-between">Questions

            <!-- add new question -->
              <button
              type="button"
              @click="addQuestion()"
              class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700"
              >
               <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                />
              </svg>
            add question
              </button>
            <!-- end -->
          </h3>
          <div v-if="!model.questions.length" class="text-center text-gray-600">
              You don't have any questions created
          </div>
          <div v-for="(question, index) in model.questions" :key="question.id" >
            <QuestionEditor
            :question="question"
            :index="index"
            @change="questionChange"
            @addQuestion="addQuestion"
            @deleteQuestion="deleteQuestion"
            />
          </div>
        </div>


       <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
         <button
          type="submit"
          class="
          inline-flex
          justify-center
          py-2
          px-4
          border border-transparant
          shadow-sm
          text-sm
          font-medium
          rounded-md
          text-white
          bg-indigo-600
          hover:bg-indigo-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-indigo-500
          "
         >
          Save
         </button>
       </div>
     </div>
   </form>
 </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store";
import { ref, computed, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
import { useRoute, useRouter } from "vue-router";
import QuestionEditor from "../components/editor/QuestionEditor.vue"

const router = useRouter();

const route = useRoute();

const surveyLoading = computed(() => store.state.currentSurvey.loading);
// Create empty survey
let model = ref({
  title: "",
  status: false,
  description: null,
  image_url: null,
  expire_date: null,
  questions: [],
});

watch(
  () => store.state.currentSurvey.data,
   (newVal, oldOval) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal)),
      status: newVal.status !== 'draft',  
    }
});


if (route.params.id) {
  // mengambil modal
  // model.value = store.state.surveys.find(
  //   (s) => s.id === parseInt(route.params.id)
  // );
  store.dispatch("getSurvey", route.params.id);
}

function onImageChoose(ev) {
  const file = ev.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {

    model.value.image = reader.result;

    model.value.image_url = reader.result;
  };
  reader.readAsDataURL(file);
}

function addQuestion(index) {
  const newQuestion = {
    id: uuidv4(),
    type: "text",
    question: "",
    description: null,
    data: {},
  };
  model.value.questions.splice(index, 0, newQuestion);
}

function deleteQuestion(question) {
  model.value.questions = model.value.questions.filter(
    (q) => q !== question
  );
}

function questionChange(question) {
  model.value.questions = model.value.questions.map((q) => {
    if (q.id === question.id) {
      return JSON.parse(JSON.stringify(question));
    }
    return q;
  });
}

function saveSurvey() {
  store.dispatch("saveSurvey", model.value).then(({ data }) => {
    store.commit('notify', {
      type: 'success',
      message: 'Berhasil Update'
    })
    router.push({
      name: "SurveyView",
      params: {id: data.data.id}
    })
  });
}

function deleteSurvey() {
  if (confirm("Are You Sure")) {
    store.dispatch("deleteSurvey", model.value.id)
    .then(() => {
      router.push({
        name: "Surveys",
      });
    });
  }
}
</script>
<style></style>
