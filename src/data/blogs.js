export const blogs = [
  {
    slug: "java-folder-structure-best-practices",
    title: "Java Folder Structure Best Practices",
    category: "Java Architecture",
    date: "August 12, 2026",
    readTime: "5 min read",
    excerpt:
      "A practical Spring Boot package structure that keeps controllers, services, repositories, entities, DTOs, mappers, and exceptions easy to maintain.",
    summary:
      "A clean folder structure helps recruiters and engineering reviewers understand how you think about maintainability. In Java and Spring Boot projects, the goal is to separate request handling, business logic, persistence, configuration, and shared utilities.",
    sections: [
      {
        heading: "Recommended Structure",
        body:
          "A professional Spring Boot project usually groups code by responsibility. This makes the project easier to scan, test, and extend as features grow.",
        code: `src/main/java/com/example/app
|-- controller
|-- service
|   |-- impl
|-- repository
|-- entity
|-- dto
|-- mapper
|-- config
|-- exception
|-- security
|-- util`,
      },
      {
        heading: "What Each Folder Does",
        body:
          "The controller package receives HTTP requests and returns responses. The service package contains business rules. The repository package communicates with the database. Entity classes represent database tables or collections, while DTO classes shape API input and output. Mappers convert between entities and DTOs. Config, exception, security, and util packages keep cross-cutting concerns organized.",
      },
      {
        heading: "Best Practice",
        body:
          "Keep controllers thin, services expressive, repositories focused on persistence, and DTOs dedicated to API contracts. This separation makes code easier to review and reduces accidental coupling between the database model and the public API.",
      },
    ],
  },
  {
    slug: "entity-vs-dto-in-spring-boot",
    title: "Entity vs DTO in Spring Boot",
    category: "Spring Boot",
    date: "August 12, 2026",
    readTime: "6 min read",
    excerpt:
      "Understand the difference between database entities and API DTOs, why exposing entities is risky, and how to use DTOs cleanly.",
    summary:
      "Entities and DTOs solve different problems. An entity models how data is stored. A DTO models how data is exchanged through an API.",
    sections: [
      {
        heading: "What Is an Entity?",
        body:
          "An entity is a persistence object managed by JPA or another data layer. It commonly maps to a database table and contains fields, relationships, and persistence annotations.",
        code: `@Entity
public class UserEntity {
    @Id
    private Long id;
    private String name;
    private String email;
    private String password;
}`,
      },
      {
        heading: "What Is a DTO?",
        body:
          "A DTO is a data transfer object used for request or response payloads. It contains only the fields that the API should accept or return.",
        code: `public class UserDTO {
    private Long id;
    private String name;
    private String email;
}`,
      },
      {
        heading: "Why Not Expose Entity Directly?",
        body:
          "Exposing entities can leak sensitive fields, create circular JSON issues, couple API responses to database design, and make future schema changes harder. DTOs protect the API boundary and keep responses intentional.",
      },
      {
        heading: "Best Practice",
        body:
          "Use request DTOs for incoming data, response DTOs for outgoing data, and mapper methods to convert between DTOs and entities. This keeps validation, persistence, and API contracts cleanly separated.",
      },
    ],
  },
  {
    slug: "clean-backend-architecture-java",
    title: "Clean Backend Architecture for Java Projects",
    category: "Backend Design",
    date: "August 12, 2026",
    readTime: "5 min read",
    excerpt:
      "A clear way to separate controller, service, repository, entity, and DTO layers in a Java backend project.",
    summary:
      "Clean backend architecture is about keeping each layer responsible for one kind of work. The result is code that is easier to test, debug, and explain in interviews.",
    sections: [
      {
        heading: "Controller Layer",
        body:
          "Controllers handle HTTP requests, validate request shape where needed, call services, and return response DTOs. They should not contain database queries or complex business rules.",
      },
      {
        heading: "Service Layer",
        body:
          "Services hold the main business logic. They coordinate repositories, apply rules, call mappers, and decide what should happen for each use case.",
      },
      {
        heading: "Repository Layer",
        body:
          "Repositories handle database access. In Spring Data JPA, repository interfaces keep persistence code focused and reusable without mixing it into controllers or services.",
      },
      {
        heading: "Entity and DTO Layers",
        body:
          "Entities represent stored data. DTOs represent API data. Separating them protects the application from leaking internal database structure into external responses.",
        code: `Controller -> Service -> Repository -> Database
     |           |
     |           -> Mapper -> DTO
     -> Request/Response`,
      },
    ],
  },
];
