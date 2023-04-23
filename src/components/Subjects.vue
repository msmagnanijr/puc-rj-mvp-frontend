<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <img :src="require('../assets/logo.png')"/><br><br>
        <hr>
        <h2>Minhas Disciplinas</h2>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-info btn-lg" v-b-modal.subject-modal>
          Adicionar Disciplina</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Nome da Disciplina</th>
              <th scope="col">Professor Responsável</th>
              <th scope="col">Em Andamento?</th>
              <th scope="col">Descrição</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(subject, index) in subjects" :key="index">
              <td>{{ subject.name }}</td>
              <td>{{ subject.teacher }}</td>
              <td>
                <span v-if="subject.inprogress">Sim</span>
                <span v-else>Não</span>
              </td>
               <td>{{ subject.description }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-secondary btn-sm"
                          v-b-modal.subject-update-modal
                          @click="editSubject(subject)">
                      Atualizar
                  </button>
                  <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="onDeleteSubject(subject)">
                      Remover
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal ref="addSubjectModal"
            id="subject-modal"
            title="Adicionar uma Nova Disciplina"
            hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
      <b-form-group id="form-name-group"
                    label="Nome da Disciplina:"
                    label-for="form-name-input">
          <b-form-input id="form-name-input"
                        type="text"
                        v-model="addSubjectForm.name"
                        required
                        placeholder="Digite o Nome da Disciplina">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-teacher-group"
                      label="Professor Responsável:"
                      label-for="form-teacher-input">
            <b-form-input id="form-teacher-input"
                          type="text"
                          v-model="addSubjectForm.teacher"
                          required
                          placeholder="Digite o nome do Professor Responsável">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-description-group"
                      label="Descrição:"
                      label-for="form-description-input">
            <b-form-input id="form-description-input"
                          type="text"
                          v-model="addSubjectForm.description"
                          required
                          placeholder="Digite a Descrição da Disciplina">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-inprogress-group">
          <b-form-checkbox-group v-model="addSubjectForm.inprogress" id="form-checks">
            <b-form-checkbox value="true">Em Andamento?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Salvar</b-button>
          <b-button type="reset" variant="danger">Cancelar</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
    <b-modal ref="editSubjectModal"
            id="subject-update-modal"
            title="Atualizar Disciplina"
            hide-footer>
      <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
      <b-form-group id="form-name-edit-group"
                    label="Nome da Disciplina:"
                    label-for="form-name-edit-input">
          <b-form-input id="form-name-edit-input"
                        type="text"
                        v-model="editForm.name"
                        required
                        placeholder="Digite o Nome da Disciplina">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-teacher-edit-group"
                      label="Professor Responsável:"
                      label-for="form-teacher-edit-input">
            <b-form-input id="form-teacher-edit-input"
                          type="text"
                          v-model="editForm.teacher"
                          required
                          placeholder="Digite o nome do Professor Responsável">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-description-edit-group"
                      label="Descrição:"
                      label-for="form-description-edit-input">
            <b-form-input id="form-description-edit-input"
                          type="text"
                          v-model="editForm.description"
                          required
                          placeholder="Digite a Descrição da Disciplina">
            </b-form-input>
        </b-form-group>
        <b-form-group id="form-inprogress-edit-group">
          <b-form-checkbox-group v-model="editForm.inprogress" id="form-checks">
            <b-form-checkbox value="true">Em Andamento?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button-group>
          <b-button type="submit" variant="primary">Salvar</b-button>
          <b-button type="reset" variant="danger">Cancelar</b-button>
        </b-button-group>
      </b-form>
    </b-modal>
    <hr>

  </div>
</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';

export default {
  data() {
    return {
      subjects: [],
      addSubjectForm: {
        name: '',
        teacher: '',
        inprogress: [],
        description: '',
      },
      message: '',
      showMessage: false,
      editForm: {
        id: '',
        name: '',
        teacher: '',
        inprogress: [],
        description: '',
      },
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    getSubjects() {
      const path = 'http://localhost:5000/subjects';
      axios.get(path)
        .then((res) => {
          this.subjects = res.data.subjects;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
        });
    },
    addSubject(payload) {
      const path = 'http://localhost:5000/subjects';
      axios.post(path, payload)
        .then(() => {
          this.getSubjects();
          this.message = 'Disciplina Adicionada!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
          this.getSubjects();
        });
    },
    initForm() {
      this.addSubjectForm.name = '';
      this.addSubjectForm.teacher = '';
      this.addSubjectForm.inprogress = [];
      this.addSubjectForm.description = '';
      this.editForm.id = '';
      this.editForm.name = '';
      this.editForm.teacher = '';
      this.editForm.inprogress = [];
      this.editForm.description = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addSubjectModal.hide();
      let inprogress = false;
      if (this.addSubjectForm.inprogress[0]) inprogress = true;
      const payload = {
        name: this.addSubjectForm.name,
        teacher: this.addSubjectForm.teacher,
        inprogress, // property shorthand
        description: this.addSubjectForm.description,
      };
      this.addSubject(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addSubjectModal.hide();
      this.initForm();
    },
    editSubject(subject) {
      this.editForm = subject;
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editSubjectModal.hide();
      let inprogress = false;
      if (this.editForm.inprogress[0]) inprogress = true;
      const payload = {
        name: this.editForm.name,
        teacher: this.editForm.teacher,
        inprogress,
        description: this.editForm.description,
      };
      this.updateSubject(payload, this.editForm.id);
    },
    updateSubject(payload, subjectID) {
      const path = `http://localhost:5000/subjects/${subjectID}`;
      axios.put(path, payload)
        .then(() => {
          this.getSubjects();
          this.message = 'Disciplina Atualizada!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getSubjects();
        });
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editSubjectModal.hide();
      this.initForm();
      this.getSubjects(); // why?
    },
    removeSubject(subjectID) {
      const path = `http://localhost:5000/subjects/${subjectID}`;
      axios.delete(path)
        .then(() => {
          this.getSubjects();
          this.message = 'Disciplina Removida!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error);
          this.getSubjects();
        });
    },
    onDeleteSubject(subject) {
      this.removeSubject(subject.id);
    },
  },
  created() {
    this.getSubjects();
  },
};
</script>
