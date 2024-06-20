import React from 'react'
import styled from "styled-components";
export default function Welcome() {
    return (
        <Wel>
            <div className="content">
                <h1>Quick Chat</h1>
                <p>Share your thought easily and faster with our platform.</p>
                <div>
                    <a href="/login" className="button"><span></span>LOG IN</a>
                    <a href="/register" className="button"><span></span>SIGN UP</a>
                </div>
            </div>
        </Wel>
    )
}

const Wel = styled.div`

    #logo {
      width: 200px; /* Adjust the logo size */
      height: auto;
      position: absolute;
      top: 40px;
      left: 20px;
      margin-left: 50px;
      cursor: pointer;
    }

    .content{
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      text-align: center;
      color: #fff;
    }
    .content h1{
      font-size: 60px;
      margin-top: 80px;
      margin-bottom: 20px;
    }
    .content p{
      margin: 20px auto;
      font-weight: 100;
      line-height: 25px;
    }
    a.button {
      display: inline-block;
      width: 200px;
      padding: 15px 0;
      text-align: center;
      margin: 20px 10px;
      border-radius: 25px;
      font-weight: bold;
      color: #fff;
      cursor: pointer;
      background-color: #00819691;
      position: relative;
      overflow: hidden;
      text-decoration: none; 
    }
    a.button span{
      background: #009688;
      height: 100%;
      width: 0;
      border-radius: 25px;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: -1;
      transition: 0.5s ;
    }
    a.button:hover span{
      width: 100%;
      transform: scale(1.05);
      background-color: rgb(138, 190, 227);
      color: rgb(250, 250, 250);
    }
    a.button:hover{
      border: none;
      transform: scale(1.05);      
      background-color: rgb(138, 190, 227);
      color: rgb(255, 255, 255);
    }
    a.button:active span{
      width: 100%;
      background: #d1cdcf;
    }
    a.button:active{
      border: none;
    }
`;

