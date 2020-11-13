# Hack-A-Bit-2020
Blog Project
 
                                    note:-
                            ====================
This is  a fullstack project which uses Node.ja as backend and Mongodb.Atlas as cloud database.

*********************************************************************


                                           Requirements {FOR LOCAL RUNNING OF THE CODE  }:-
                                    ===================================================================
                      1. You need to install node.js in the system you want to use the application locally.
                      2.No need to install mongodb as here we are using cloud version of it.
                      3.You need a text editor like   VS CODE .
                      
                      
                                         STEPS FOR SETUP:-
                                 =====================================
                      1.OPEN the Hack-A-Bit-2020 pulled folder with the help of vscoded
                      2.Go to app.js file and edit the line ie.:-
                          '
                 line no.275(VS CODE):-    
             ========================================== 
                 app.listen(process.env.PORT,process.env.IP);
                         
                         
                         remove the above line  and copy-paste the code given below to replace the line 275 code:-
                     ====================================================================       
                            app.listen("3000",function(){
	                                   console.log("Server Started");
                                      });
                        *********************************************************************        
                     
                     
             3. OPEN THE TERMINAL OF THE VS CODE AND WRITE 
             node app.js 
              AND THEN HIT ENTER  A CONSOLE MESSAGE WILL APPEAR AND IT WILL BE WRIITEN "SERVER STATED"
              (LET IT RUN IN THE BACKGROUND )
            
            4.open chrome and in place of url coy-paste the below given link:-
            
            localhost:3000
            
            5.Enjoy the app..!!!
            
            6.You can close the server by hitting "ctr+c" in the terminal
                                    
                                    
                                    
                                    
                 *******************************************************************************
