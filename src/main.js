import{createApp} from 'vue'
import Todos from './api/todos'
import './assets/css/main.css'

 const apiTodos = new Todos()
 const app = createApp({

    data() {
            return {

                todos: [],
                form: {
                    text: '',
                    done: false
                },
                loading: false
            }

        },
        async created() {
                this.fetchTodos()
            },
            methods: {
                async fetchTodos() {
                    try {
                        this.todos = await apiTodos.index()

                    } catch (error) {
                        console.log(error)
                    }finally {
                        this.loading = false
                    }

                    
                },
                async createTodo() {

                    try {
                        const data = await apiTodos.store(this.form)
                    this.todos.push(data)

                    this.form.text=''
                    this.form.done=false

                    } catch (error) {
                        console.log(error)
                    }
                    
                },

                async toggleTodoStatus(todo) {

                    try {
                      const data = await apiTodos.update({
                        ... todo,
                        done: !todo.done
                })
                const index = this.todos.findIndex(({id})=> id == data.id)
                    this.todos[index]= data  
                    } catch (error) {
                        console.log(error)
                    }
                    
                },
                async destroyTodo(id){
                    try {
                         await apiTodos.destroy({id})
                    const index = this.todos.findIndex((todo)=> todo.id ==id)
                    this.todos.splice(index, 1)
                    } catch (error) {
                        console.log(error)
                    }
                   
                }
            
            },
            

    })

    app.mount('#app')
  