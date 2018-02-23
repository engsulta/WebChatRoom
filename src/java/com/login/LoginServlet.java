/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.login;

import com.dao.Contact;
import static com.login.RegisterServlet.allcontacts;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Vector;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author sulta
 */
@WebServlet(name = "LoginServlet", urlPatterns = {"/LoginServlet"})
public class LoginServlet extends HttpServlet {
    ServletConfig sconf = null;

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    public void init(ServletConfig sc) throws ServletException {
        sconf = sc;
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);
        ServletContext servletContext = sconf.getServletContext();
        allcontacts=(Vector<Contact>) servletContext.getAttribute("allcontacts");
        String name = request.getParameter("username");
        String password = request.getParameter("password");
        int id = 0;
        boolean exists = false;
        System.out.println(name);
        for (Contact contact : allcontacts) {
            if (contact.getName() == name) {
                id = contact.getId();
                contact.setStatus("online");
                exists = true;
            }

        }
        if (exists) {

            RequestDispatcher rd = request.getRequestDispatcher("main.html");
            rd.forward(request, response);

        } else {
            response.setContentType("text/html");
            PrintWriter out = response.getWriter();
            out.write("not found in db");
            response.sendRedirect("index.html");
            System.out.println("this user not in my DB");
        }

    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);
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

}
