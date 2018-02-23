/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.msg;

import com.dao.Message;
import com.google.gson.Gson;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Vector;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author sulta
 */
@WebServlet(name = "MainServlet",
        urlPatterns = {"/MainServlet"}
)
public class MainServlet extends HttpServlet {

    public static Vector<Message> allmessages = new Vector<>();

    @Override
    public void init() throws ServletException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String name = request.getParameter("name");
        String body = request.getParameter("body");
        System.out.println(name);
        System.out.println(body);
        Message recieved = new Message(allmessages.size(), name, body);
        allmessages.add(recieved);

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       // processRequest(request, response);
       
        int lastmsgid = Integer.parseInt(request.getParameter("lastid"));
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();
        
        Gson gsonMessages = new Gson();
        String jsonString;
        if (allmessages.size() - 1 > lastmsgid) {
            jsonString = gsonMessages.toJson(getmessagesfrom(lastmsgid));
            out.write(jsonString);
        } else {
            jsonString = gsonMessages.toJson(allmessages);
        }
        out.write(jsonString);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    private Vector<Message> getmessagesfrom(int lastmsgid) {
        Vector<Message> ret = new Vector<>();
        for (Message message : allmessages) {
            if (message.getId() > lastmsgid) {
                ret.add(message);
            }

        }
        return ret;
    }

}
