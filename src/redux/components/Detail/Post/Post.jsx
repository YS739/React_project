import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { React ,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { __deletePost } from "../../../modules/postsSlice";
import CustomButtons from "../../CustomButtons";
import { Div } from "./style";


const Post = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const param = useParams();
  const currentUserId = localStorage.getItem("id");
  const thePost = posts.find((post) => post.id === param.id);
  // 삭제버튼
  const deletePostHandler = (postId) => {
    if (window.confirm("삭제하시겠습니까")) {
      dispatch(__deletePost(postId));
      navigate("/");
    }
  };

  return (
    <div>
      <div key={thePost?.id}>
        <h1>토론주제 :{thePost?.title}</h1>
        <h2>선택분류</h2>
        <p>A : {thePost?.categoryA}</p>
        <p>B : {thePost?.categoryB}</p>
        <p>like : {thePost?.like.length}</p>

        <Div>{thePost?.uid===currentUserId ?   <div>
        <button  onClick={() => navigate(`/edit/${thePost?.id}`)}>
          수정
          </button>
        <button 
          type="button"
          onClick={() => deletePostHandler(thePost?.id)}
        >
          삭제
          </button>  
        </div>:  ""  }</Div>
      </div>
    </div>
  );
};

export default Post;
