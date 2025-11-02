package com.quizapp.quizonline.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String question;
    @NotBlank
    private String subject;
    @NotBlank
    private String questionType;

    @NotEmpty
    @ElementCollection
    private List<String> choices;

    @NotEmpty
    @ElementCollection
    private List<String> correctAnswers;
}
