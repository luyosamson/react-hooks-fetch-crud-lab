import React,{useState,useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [quiz,setQuiz]=useState([])

  function deletedItem(id){

    fetch(`http://localhost:4000/questions/${id}`,{
     method:"DELETE" 
    })
    .then(()=>fetchs())
  }
  function handleChange(event,id){
fetch(`http://localhost:4000/questions/${id}`,{
  method:"PATCH",
  header:{"Content-Type":"application/json"},
  body:JSON.stringify({
    "correctIndex":parseInt(event.target.value)
  })
})
  }

function fetchs(){
  fetch("http://localhost:4000/questions")
  .then(r=>r.json())
  .then(ans=>{
      setQuiz(ans.map(answer=>
       <QuestionItem key={answer.id} 
       handleChange={handleChange}
       question={answer}
       deleted={deletedItem}
        />
        ))
  })

}

  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>fetchs(),[])




  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
      {quiz}
      </ul>
    </section>
  );
}

export default QuestionList;
