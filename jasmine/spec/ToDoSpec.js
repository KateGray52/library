describe('Testing the functionality, this is the checklist', ()=>{
  let todo, item, item2;
  beforeEach(function(){
    todo = new ToDo();
    item = {
      id: 1,
      title: "get milk 1",
      complete: false
     }
     item2 = {
      id: 2,
      title: "get milk 2",
      complete: false
     }
  })
  it('should add an item', ()=>{
    const done = todo.addTodo(item)
    expect(todo.getItems().length).toBe(1);
  })
  it('should delete an item', ()=>{
        todo.addTodo(item)
        todo.addTodo(item2)
       todo.delete(2)
       expect(todo.getItems()[todo.getItems().length-1].id).toBe(1);
     })

     it('should mark item as complete', function(){
       todo.addTodo(item)
       todo.addTodo(item2)
       todo.complete(2)
      expect(todo.getItems().find(item => item.id == 2).complete).toBe(true);
    })


})





describe('Testing DOM manipulation', function(){
  let Dom, item, todo;
  beforeEach(function(){
     todo = new ToDo();
    Dom = new DomManipulation();
    item = {
      complete: false,
      id : 1,
      title: 'some Title'
    }
 })
 it('should initialise HTML', function(){
     const form = document.createElement('form');
     const input = document.createElement('input')
     const ul = document.createElement('ul')
     input.id = "AddItemInput"
     form.id="addItemForm"
     form.appendChild(input);
     expect(Dom.init().form).toEqual(form)
     expect(Dom.init().ul).toEqual(ul)
   })
   it('should create item', function(){
    const element = Dom.displayItem(item);
    const result = document.createElement('li');
    result.innerText = item.title
    expect(element).toEqual(result)
  })
})
