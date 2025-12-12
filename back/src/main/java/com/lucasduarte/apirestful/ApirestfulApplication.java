package com.lucasduarte.apirestful;

import com.lucasduarte.apirestful.auth.model.Usuario;
import com.lucasduarte.apirestful.auth.repository.UsuarioRepository;
import com.lucasduarte.apirestful.auth.util.Role;
import com.lucasduarte.apirestful.model.*;
import com.lucasduarte.apirestful.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

@RequiredArgsConstructor
@SpringBootApplication
public class ApirestfulApplication implements CommandLineRunner {

    private final AlunoRepository alunoRepository;
    private final ProfessorRepository professorRepository;
    private final InscricaoRepository inscricaoRepository;
    private final TurmaRepository turmaRepository;
    private final DisciplinaRepository disciplinaRepository;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(ApirestfulApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        //Login de ADMIN : email: admin@mail.com | senha: password
        Usuario admin = new Usuario(
                "ADMIN",
                "admin@mail.com",
                passwordEncoder.encode("password"),
                Role.ADMIN
        );
        usuarioRepository.save(admin);

        Usuario user = new Usuario(
                "USER",
                "user@mail.com",
                passwordEncoder.encode("password"),
                Role.USER
        );
        usuarioRepository.save(user);

        //ALUNOS
        Aluno aluno = new Aluno("leonardo", "leonardo@gmail.com","6421971777");
        alunoRepository.save(aluno);

        Aluno aluno1 = new Aluno("mariana", "mariana@gmail.com","8221956158");
        alunoRepository.save(aluno1);

        Aluno aluno2 = new Aluno("rafael", "rafael@gmail.com","2130234588");
        alunoRepository.save(aluno2);

        Aluno aluno3 = new Aluno("juliana", "juliana@gmail.com","7922335521");
        alunoRepository.save(aluno3);

        Aluno aluno4 = new Aluno("andre", "andre@gmail.com","6133324471");
        alunoRepository.save(aluno4);

        Aluno aluno5 = new Aluno("beatriz", "beatriz@gmail.com","8934114461");
        alunoRepository.save(aluno5);

        Aluno aluno6 = new Aluno("carlos", "carlos@gmail.com","4621985000");
        alunoRepository.save(aluno6);

        Aluno aluno7 = new Aluno("daniela", "daniela@gmail.com","8428151388");
        alunoRepository.save(aluno7);

        Aluno aluno8 = new Aluno("eduardo", "eduardo@gmail.com","9632894914");
        alunoRepository.save(aluno8);

        Aluno aluno9 = new Aluno("fernanda", "fernanda@gmail.com","3594755545");
        alunoRepository.save(aluno9);

        Aluno aluno10 = new Aluno("gustavo", "gustavo@gmail.com","24987655422");
        alunoRepository.save(aluno10);

        Aluno aluno11 = new Aluno("helena", "helena@gmail.com","31987655447");
        alunoRepository.save(aluno11);

        Aluno aluno12 = new Aluno("igor", "igor@gmail.com","211087655499");
        alunoRepository.save(aluno12);

        Aluno aluno13 = new Aluno("isabela", "isabela@gmail.com","31281555410");
        alunoRepository.save(aluno13);

        Aluno aluno14 = new Aluno("joaquim", "joaquim@gmail.com","221987655420");
        alunoRepository.save(aluno14);

        Aluno aluno15 = new Aluno("karina", "karina@gmail.com","21988852433");
        alunoRepository.save(aluno15);

        Aluno aluno16 = new Aluno("lucas", "lucas@gmail.com","23987234477");
        alunoRepository.save(aluno16);

        //NOVOS ALUNOS PARA TESTAR PAGINAÇÃO
        Aluno aluno17 = new Aluno("Marcos", "marcos@gmail.com", "11987654321");
        alunoRepository.save(aluno17);

        Aluno aluno18 = new Aluno("Patricia", "patricia@gmail.com", "21987654322");
        alunoRepository.save(aluno18);

        Aluno aluno19 = new Aluno("Ricardo", "ricardo@gmail.com", "31987654323");
        alunoRepository.save(aluno19);

        Aluno aluno20 = new Aluno("Sandra", "sandra@gmail.com", "41987654324");
        alunoRepository.save(aluno20);

        Aluno aluno21 = new Aluno("Thiago", "thiago@gmail.com", "51987654325");
        alunoRepository.save(aluno21);

        Aluno aluno22 = new Aluno("Vanessa", "vanessa@gmail.com", "61987654326");
        alunoRepository.save(aluno22);

        Aluno aluno23 = new Aluno("William", "william@gmail.com", "71987654327");
        alunoRepository.save(aluno23);

        Aluno aluno24 = new Aluno("Yasmin", "yasmin@gmail.com", "81987654328");
        alunoRepository.save(aluno24);

        Aluno aluno25 = new Aluno("Zeca", "zeca@gmail.com", "91987654329");
        alunoRepository.save(aluno25);

        Aluno aluno26 = new Aluno("Amanda", "amanda@gmail.com", "11987654330");
        alunoRepository.save(aluno26);

        Aluno aluno27 = new Aluno("Bruno", "bruno@gmail.com", "21987654331");
        alunoRepository.save(aluno27);

        Aluno aluno28 = new Aluno("Camila", "camila@gmail.com", "31987654332");
        alunoRepository.save(aluno28);

        Aluno aluno29 = new Aluno("Diego", "diego@gmail.com", "41987654333");
        alunoRepository.save(aluno29);

        Aluno aluno30 = new Aluno("Elaine", "elaine@gmail.com", "51987654334");
        alunoRepository.save(aluno30);

        Aluno aluno31 = new Aluno("Isabella", "isabella@gmail.com","6421971777");
        alunoRepository.save(aluno31);

        Aluno aluno32 = new Aluno("Jonathan", "jonathan@gmail.com","6421971777");
        alunoRepository.save(aluno31);

        Aluno aluno33 = new Aluno("Murilo", "murilo@gmail.com","6421971777");
        alunoRepository.save(aluno31);

        Professor professor1 = new Professor("Roberto", "roberto@gmail.com");
        professorRepository.save(professor1);

        Professor professor2 = new Professor("Ana", "ana@gmail.com");
        professorRepository.save(professor2);

        Professor professor3 = new Professor("Carlos", "carlos@gmail.com");
        professorRepository.save(professor3);

        Professor professor4 = new Professor("Beatriz", "beatriz@gmail.com");
        professorRepository.save(professor4);

        Professor professor5 = new Professor("Fernando", "fernando@gmail.com");
        professorRepository.save(professor5);


        Disciplina disciplina1 = new Disciplina("Programação Orientada a Objetos", 60);
        disciplinaRepository.save(disciplina1);

        Disciplina disciplina2 = new Disciplina("Desenvolvimento Web", 75);
        disciplinaRepository.save(disciplina2);

        Disciplina disciplina3 = new Disciplina("Matemática Aplicada", 60);
        disciplinaRepository.save(disciplina3);

        Disciplina disciplina4 = new Disciplina("Algoritmos e Estruturas de Dados", 80);
        disciplinaRepository.save(disciplina4);

        Turma turma1 = new Turma("T101", 2025, 1, professor1, disciplina1);
        turmaRepository.save(turma1);

        Turma turma1b = new Turma("T102", 2025, 2, professor3, disciplina1);
        turmaRepository.save(turma1b);


        Turma turma2 = new Turma("T201", 2025, 1, professor2, disciplina2);
        turmaRepository.save(turma2);

        Turma turma2b = new Turma("T202", 2025, 2, professor4, disciplina2);
        turmaRepository.save(turma2b);


        Turma turma3 = new Turma("T301", 2025, 1, professor3, disciplina3);
        turmaRepository.save(turma3);

        Turma turma3b = new Turma("T302", 2025, 2, professor5, disciplina3);
        turmaRepository.save(turma3b);


        Turma turma4 = new Turma("T401", 2025, 1, professor4, disciplina4);
        turmaRepository.save(turma4);

        Turma turma4b = new Turma("T402", 2025, 2, professor1, disciplina4);
        turmaRepository.save(turma4b);

        Inscricao inscricao = new Inscricao(aluno1, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno2, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno3, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno4, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno5, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno6, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno7, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno8, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno9, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno10, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno11, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno12, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno13, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno14, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno15, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno16, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno17, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno18, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno19, turma1);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno20, turma1);
        inscricaoRepository.save(inscricao);

        // TURMA1B (T102) - POUCOS ALUNOS (2 alunos - requisito mínimo)
        inscricao = new Inscricao(aluno21, turma1b);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno22, turma1b);
        inscricaoRepository.save(inscricao);

        // TURMA2 (T201) - 2 ALUNOS
        inscricao = new Inscricao(aluno23, turma2);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno24, turma2);
        inscricaoRepository.save(inscricao);

        //  TURMA2B (T202) - 2 ALUNOS
        inscricao = new Inscricao(aluno25, turma2b);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno26, turma2b);
        inscricaoRepository.save(inscricao);

        //  TURMA3 (T301) - 2 ALUNOS
        inscricao = new Inscricao(aluno27, turma3);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno28, turma3);
        inscricaoRepository.save(inscricao);

        //  TURMA3B (T302) - 2 ALUNOS
        inscricao = new Inscricao(aluno29, turma3b);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno30, turma3b);
        inscricaoRepository.save(inscricao);

        //  TURMA4 (T401) - 2 ALUNOS
        inscricao = new Inscricao(aluno, turma4);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno1, turma4);
        inscricaoRepository.save(inscricao);

        // TURMA4B (T402) - 2 ALUNOS
        inscricao = new Inscricao(aluno2, turma4b);
        inscricaoRepository.save(inscricao);
        inscricao = new Inscricao(aluno3, turma4b);
        inscricaoRepository.save(inscricao);
    }
}