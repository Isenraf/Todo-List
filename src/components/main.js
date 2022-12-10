function main(node) {
  const markup = ` 
      <main>

          <aside>

            <div class="default-box">

              <ul class="default">   
              </ul>

            </div>

            <div class="new-box">

              <div class="new-headline">

                <span>projects</span>

                <button type="button">
                  <i class="las la-plus" data-name="unhide-project"></i>
                </button>

              </div>

              <ul class="new"> 
              </ul>

              <form class="hidden">

                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="personal"
                  required
                />

                <div class="project-btn">

                  <button data-name="cancel-project"  type="button">
                    cancel
                  </button>

                  <button data-name="add-project"  type="submit">
                    add
                  </button>

                </div>

              </form>

            </div>

          </aside>

          <section>
          
            <div class="project-headline">
            </div>

            <div class="project-todos">
            </div>

            <form class="task-form hidden">

              <input
                type="text"
                name="title"
                id="title"
                placeholder="task name"
                required
              />

              <textarea 
                id="description" 
                name="description"
                rows="5"
                cols="33"
                placeholder="description..."
                ></textarea>

              <input type="date" id="date" name="date" />
              
              <select name="priority" id="priority">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>

              <div class="task-btn">

                <button data-name="cancel-task"  type="button">
                  cancel
                </button>

                <button data-name="add-task"  type="button">
                  add
                </button>

              </div>

            </form>


            <div class="add-task-box">

              <button type="button">
                <i class="las la-plus" data-name="unhide-task"></i>
              </button>

            </div>

          </section>

      </main>`;

  node.insertAdjacentHTML("beforeend", markup);
}

export default main;
