package com.pomodorotimer.exceptions;

public class WrongPasswordException extends Exception {

    @Override
    public String getMessage() {
        return "Email ou senha estão incorretos!";
    }
}
