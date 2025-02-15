import React from 'react'

function NDA() {
  return (
    <div className=' bg-gradient-to-t from-red-500 to-pink-500 text-white'>
      <header>
        <div class="navbar">
                <a href="#"><div class="logo" ></div></a>
            </div>
            </header>
            <div class="container">
            <div class="box">
                <div class="box1" >
                    <h2>Non-Disclosure Agreement</h2>
                    <div class="id">
                        <p>Candidate Name</p>
                        <input class="fill" type="text" id="fname" onfocus="this.value=' '"/>
                    </div>
                    <div class="id">
                        <p>Address</p>
                        <input class="fill" type="text" id="fcourse" onclick="this.value=' '"/>
                    </div>
                    <div class="id">
                        <p>E-Mail</p>
                         <input type="email" class="fill" id="femail"/>
                     </div>
                    <div class="id">
                        <p>Mobile No.</p>
                        <input type="number" class="fill" id="fmobile"/>
                    </div>
                    <button  id="btn"  >Create your Certificate</button>
                   <div class="term">
                    <p><small>By continuing, you agree to <a href="#" >Conditions of Use </a> and <a href="#">Privacy Notice</a>.</small></p>
                   </div> 
                   <div class="medal">
                   <i class="fa-solid fa-medal" id="gold"></i>
                   <i class="fa-solid fa-medal" id="silver"></i>
                   <i class="fa-solid fa-medal" id="bronze"></i>
                   </div>
                </div>
</div>



<section class="main border" id="main">
    <div class="./logo2">
    <img src="./cerlogo.png"/>
    </div>
<hr/>
    <div class="intro">
        
            <h4>To</h4>
            <div class="input">
                <h3>Name: <b class="n"></b></h3>
                <h3>Address:<small id="add"></small></h3> 
                <h3>Email:<b id="em"></b></h3> 
                <h3>mobile:<b id="mb"></b></h3>
            </div>
            <p class="subject"><b>Subject:</b> Non-Disclosure Agreement (NDA) for Intellectual Property</p> 
            
            <h3>Dear ,
                <b class="n"></b></h3>
             <div class="pera">
                <p>I am writing to formally request the implementation of a Non-Disclosure Agreement (NDA) 
                    Between MangosOrange Group and <b class="n"></b>  As Intern you understand the importance of protecting confidential and proprietary information.
                </p>
                <p>
                    <b>I propose the following terms and conditions for the NDA:</b>
                </p>
                <p>
                   <b>Definition of Confidential Information:</b>  This NDA will cover any information disclosed or Exchanged between Mangosorange and you, including but not limited to trade secrets, technical data, financial information, customer lists, business strategies, marketing plans, software, or any other information designated as confidential.
                </p>
                <p>
                    <b>Non-Disclosure Obligations:</b>  You agree to maintain the confidentiality of any and all Confidential Information disclosed to you by Mangosorange. you will not disclose, distribute, or make use of this information, except as required for the fulfillment of your responsibilities within the scope of our agreement.
                </p>
                <p> <b>Limitations on Use:</b>  I understand that the Confidential Information provided to you by Mangosorange is solely for the purpose of training, performing assigned tasks, evaluating a potential collaboration, etc. you will not use the Confidential Information for any other purpose without obtaining written consent from Mangosorange.</p>
             </div>
             <hr/>

           <footer >
            <p>MangosOrange Service Private limited</p>
            <p>crop.Off.: Top Floor,H-87,Sector-63,Noida,Utter Pradesh-201301 </p>
            <p>Contact: +91 120 416 4821,<b>Email:</b>info@MangosOrange.com,<b>Web:</b>www.MangosOrange.com</p>
           </footer>
    </div>
    </section>


    <section class="main2">
    <section class="border">
    <div class="./logo2">
    <img src="./cerlogo.png"/>
    </div>
      <hr />
    <div class="intro">
        
          
             <div class="pera">
                <p>
                   <b>Duration of Agreement:</b>This NDA will commence on the effective date of signing and will remain in effect for a period of 6 Months from the date of termination of our professional relationship.
                </p>
               <p>
                  <b>Return of Confidential Information:</b>Upon the termination of our professional relationship or at Mangosorange request, you will promptly return all Confidential Information in my possession, including any copies or reproductions thereof, or provide written certification of their destruction.
               </p>
               <p>
                 <b>Legal Recourse:</b>  In the event of a breach or threatened breach of this NDA, both parties agree That Mangosorange will be entitled to seek injunctive relief, as well as any other legal remedies available, without waiving its right to enforce the terms of this NDA or claim damages for any losses incurred.
               </p>
               <p>
                 <b>Governing Law:</b>  This NDA shall be governed by and construed in accordance with the laws of Indian jurisdiction. Any disputes arising out of or in connection with this agreement shall be subject to the exclusive jurisdiction of the courts at Gautam Budh Nagar, Uttar Pradesh.
               </p>
               <p>
                 Upon mutual agreement, you are prepared to sign the NDA and adhere to its terms. I believe That this agreement will foster a secure environment for the exchange of information and strengthen our professional relationship.
               </p>
               <p>Thank you for your attention to this matter. I look forward to your response.</p>
             </div>
             <div class="sign">
                <div class="dir">
                    
                        <h4>Mr. Ravi Rautela</h4>
                        <p>Founder & CEO</p>
                        <p>Mangosorange Agritech India Pvt. Ltd.</p>
                        </div>
                        
                        <div class="dir">
                            
                                
                              <h4>Signature </h4>
                                <p>Candidate:-<b class="n"></b></p>
                                <p>Mangosorange Service Pvt. Ltd.</p>
                        </div>
                        </div>
             <hr/>

           <footer >
            <p>MangosOrange Service Private limited</p>
            <p>crop.Off.: Top Floor,H-87,Sector-63,Noida,Utter Pradesh-201301 </p>
            <p>Contact: +91 120 416 4821,<b>Email:</b>info@MangosOrange.com,<b>Web:</b>www.MangosOrange.com</p>
           </footer>
    </div>
    </section>
    </section>
</div>
    </div>
  )
}

export default NDA