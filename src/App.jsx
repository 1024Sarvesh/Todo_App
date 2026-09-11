import { CircleCheckBig, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import LiveClock from './components/Date'
import { Category, Priority } from './components/Data'

function App() {

 const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks")
  return savedTasks ? JSON.parse(savedTasks) : []
})

useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks))
}, [tasks])

  const [isPopupShow, setIsPopupShow] = useState(false)

  const [task, setTask] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState("")
  const [priority, setPriority] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [subTasks, setSubTasks] = useState([])

  const [editIndex, setEditIndex] = useState(null);

  const [singleSubtask, setSingleSubTask] = useState("")


  function resetForm() {
    setTask("")
    setDueDate("")
    setDesc("")
    setCategory("")
    setPriority("")
    setSubTasks([])
    setSingleSubTask("")

    setIsPopupShow(false)
  }

  const overdueTasks = tasks.filter(
    (el) => el.dueDate && new Date(el.dueDate) < Date.now() && !el.isCompleted
  ).length;
  return (

    <>
      <section >
        <section className='flex gap-6 m-6'>
          <aside className='border h-140 w-[20%] rounded-2xl px-3 py-2'>
            <h1 className='text-2xl font-bold text-blue-500'>ZenTodo</h1>
            <p className='text-sm flex flex-wrap font-bold text-gray-700 break-words mt-2'>Track Your Personal and Proffestional Growth</p>

            <h1 className='text-xl font-semibold mt-6'>Status</h1>

            <div>

            </div>

          </aside>
          <main className='border w-[100%] h-140 rounded-2xl p-6 bg-gray-100'>
            <div className='h-20 shadow-xl bg-white px-5 flex items-center  justify-between rounded-2xl'>
              <div>
                <h1 className='text-2xl font-semibold'>Hare krishna 🙏🏻</h1>
                <p><LiveClock /></p>

              </div>
              <button className='px-4 py-1 text-right border rounded shadow-2xl cursor-pointer m-3 bg-pink-800 text-white' onClick={() => {
                setIsPopupShow(true)
              }}>Add Task</button>
            </div>

            <section className='flex items-center justify-between gap-10 mt-5'>
              <div className='w-50 h-20 rounded-xl shadow-2xl text-center p-3 bg-white'>
                <h1 className='text-xl font-semibold'>Total Tasks 🌱</h1>
                <p>{tasks.length}</p>
              </div>
              <div className='w-50 h-20 rounded-xl shadow-2xl text-center p-3 bg-white'>
                <h1 className='text-xl font-semibold'>OverDue ⚠️</h1>
                <p>{overdueTasks}</p>
              </div>
              <div className='w-50 h-20 rounded-xl shadow-2xl text-center p-3 bg-white'>
                <h1 className='text-xl font-semibold'>Competed ✅</h1>
                <p>{tasks.filter((task) => task.isCompleted).length}</p>
              </div>
              <div className='w-50 h-20 rounded-xl shadow-2xl text-center p-3 bg-white'>
                <h1 className='text-xl font-semibold'></h1>
                <p></p>
              </div>


            </section>

          </main>
        </section>



        <div className='border-amber-950 w-[600px] h-auto'>
          <ul>
            {tasks.map((el, i) => (
              <li key={i} className={`${el.isCompleted ? "bg-green-500" : "bg-white"} px-4 mb-2 border shadow rounded-2xl m-3`}>
                <div className='flex justify-between'>
                  <p className={'text-2xl'}>{el.challenge}</p>
                  <span>
                    <button onClick={() => {
                      tasks[i].isCompleted = true;
                      const clonetask = [...tasks]
                      setTasks(clonetask)

                    }} key={i}>✔️</button>
                    <button onClick={() => {

                      const clonetask = [...tasks]
                      clonetask.splice(i, 1)
                      setTasks(clonetask)
                    }}>✖️</button>
                    <button onClick={() => {
                      console.log(tasks[i])
                      setEditIndex(i)
                      setTask(tasks[i].challenge)
                      setDesc(tasks[i].description)
                      setCategory(tasks[i].category)
                      setPriority(tasks[i].priority)
                      setDueDate(tasks[i].dueDate)
                      setSubTasks(tasks[i].subTasks)
                      setIsPopupShow(true)
                    }}>
                      ✏️
                    </button>
                  </span>
                </div>

                <p className='text-[14px]'>{el.description}</p>
                <div className='align-text-bottom text-[14px] mt-3'>

                  <button className='border rounded p-0.5 mr-2 my-2'>{el.category}</button>
                  <button
                    className={`border rounded p-0.5 mr-2 my-2 ${new Date(el.dueDate) < new Date()
                      ? "bg-red-500 text-white"
                      : ""
                      }`}
                  >
                    {new Date(el.dueDate) < new Date()
                      ? "OverDue ⚠️"
                      : el.dueDate}
                  </button>
                  <button className='border rounded p-0.5 mr-2 my-2'>{el.priority}</button>
                </div>
                <div className='flex justify-end'>

                  <span className='ml-3 font-semibold text-[16px]'>SubTasks ({el.subTasks.length})</span>
                </div>

                <div>
                  {el.subTasks.map((el, i) => (
                    <div key={i}>
                      <input type="checkbox" name="" id="" onClick={(e) => {
                        el.isCompleted = true;
                        e.target.disabled = true

                      }} />
                      <span className='ml-3 font-semibold'>{el.subTask}</span>

                    </div>
                  ))}</div>
              </li>
            ))}
          </ul>

        </div>




        {
          isPopupShow && (
            <section className='fixed inset-0 bg-black/80 flex justify-center items-center overflow-y-auto'>
              <form className='bg-white border w-96 p-3 rounded-2xl shadow-2xl' onSubmit={(e) => {
                e.preventDefault()
                const newTask =
                {
                  challenge: task,
                  description: desc,
                  category: category,
                  priority: priority,
                  dueDate: dueDate,
                  isCompleted: editIndex !== null ? tasks[editIndex].isCompleted : false,
                  subTasks: subTasks,
                }
                if (editIndex !== null) {
                  setTasks((prev) =>
                    prev.map((item, index) =>
                      index === editIndex ? newTask : item
                    )
                  );
                } else {
                  setTasks((prev) => [...prev, newTask]);
                }

                resetForm()
                setEditIndex(null)

              }}>
                <h1 className='text-3xl text-center mb-2'>Add Task Here !</h1>
                <label htmlFor="" className={'text-xl font-mono'}>Title</label><br />
                <input
                  type="text"
                  className='border w-[99%] p-0.5 bg-gray-200 hover:bg-gray-800 hover:text-white'
                  value={task}
                  onChange={(e) => { setTask(e.target.value) }}
                />
                <label htmlFor="" className='text-xl font-mono'>Description</label><br />
                <input
                  type="text"
                  className='border w-[99%] p-0.5 bg-gray-200 hover:bg-gray-800 hover:text-white'
                  value={desc}
                  onChange={(e) => { setDesc(e.target.value) }}
                />
                <label htmlFor="" className='text-xl font-mono'>Due-Date</label><br />
                <input
                  type="datetime-local"
                  className='border w-[99%] p-0.5 bg-gray-200 hover:bg-gray-800 hover:text-white'

                  value={dueDate}
                  onChange={(e) => { setDueDate(e.target.value) }}
                />


                <p className='font-mono text-xl'>category</p>
                <select value={category} name="" id=""
                  className='p-1 border w-[99%] bg-gray-200 hover:bg-gray-800 hover:text-white'
                  onChange={(e) => setCategory(e.target.value)}>
                  {
                    Category.map((cat) => (
                      <option value={cat.value}>{cat.name}</option>
                    ))
                  }


                </select>
                <p className='font-mono text-xl'>Priority</p>
                <select value={priority} name="" id=""
                  className='p-1 border w-[99%] bg-gray-200 hover:bg-gray-800 hover:text-white'
                  onChange={(e) => setPriority(e.target.value)}>
                  {Priority.map((prio) => (
                    <option value={prio.value}>{prio.name}</option>
                  ))}
                </select>
                <label htmlFor="" className='text-xl font-mono'>SubTasks</label><br />
                <div>
                  <input
                    type="text"
                    className='border w-[80%] p-0.5 bg-gray-200 hover:bg-gray-800 hover:text-white'
                    value={singleSubtask}
                    onChange={(e) => { setSingleSubTask(e.target.value) }}
                  />
                  <button className='border rounded px-4 py-0.5 ml-2 cursor-pointer bg-gray-200 hover:bg-gray-800 hover:text-white'
                    type='button'
                    onClick={() => {
                      setSubTasks((prev) => [...prev, { subTask: singleSubtask, isCompleted: false }])
                      setSingleSubTask("")
                    }}
                  >Join</button>

                  {subTasks.length ? (

                    <div className='h-16 overflow-y-scroll scrollbar-none mt-2'>
                      {subTasks.map((subtask, i) => (
                        <div key={i} className='flex justify-between'>
                          <p className=' border w-[90%] rounded bg-gray-200 hover:bg-gray-800 hover:text-white pl-2'>
                            {subtask.subTask}
                          </p>
                          <div>

                            <button type='button' key={i} className='cursor-pointer text-gray-900 hover:text-gray-400' onClick={() => {
                              const subclone = [...subTasks]
                              console.log(i)
                              subclone.splice(i, 1)
                              setSubTasks(subclone)
                            }}
                            ><Trash /></button>

                          </div>
                        </div>


                      ))}
                    </div>
                  ) : (<p className='text-center'>No task Created At.</p>)}
                </div>

                <div className='text-right mt-3'>
                  <button
                    type='submit'
                    className='border rounded px-4 mr-3 bg-gray-200 hover:bg-gray-800 hover:text-white'

                  >{editIndex !== null ? "Update" : "Add"}</button>
                  <button
                    type='button'
                    onClick={() => {
                      resetForm()
                    }}
                    className='border rounded px-4 bg-gray-200 hover:bg-gray-800 hover:text-white'
                  >cancel</button>
                </div>
              </form>
            </section>)
        }
      </section>
    </>
  )
}

export default App