# Sistema pago del horario de trabajo de empleados ACME
This is an exercise wrote in JS to get the employee's pay based on the schedule (hours and time) he worked.

#### Visión general
- El presente ejercicio es una simulación de una aplicación que calcula el pago de los empleados en la empresa ACME en base al día que trabajan y el horario.
- La solución planteada tiene como princi...

#### Arquitectura planteada
- La arquitectura aplicada es MVC (Modelo-Vista-Controlador) en base al enfoque planteado:
  - El usuario solicita el pago de los empleados por su trabajo:
  - **Vista:** Muestra los datos resultantes de consultar los valores de pago de cada empleado, en un formato agradable para el usuario, y de existir errores en algún dato, la vista muestra los errores para que sean conocidos por el usuario.
  - **Controlador:** Se comunica con la vista para receptar la lista de empleado y devolverle la respuesta del modelo. Y asi tambien, valida que los datos que llegan de la vista estén en un formato válido para ser procesados por el modelo para el usuario se comunica con el modelo para solicitar el procesamiento de esos datos, y finalmente recepta la respuesta del modelo para enviarla a la vista.
  - **Modelo:** Maneja la lógica del sistema, como el pago en base a los días y horarios de trabajo establecidos, los datos de los empleados para el cálculo de su pago.

#### Enfoque y metodología
- El enfoque que se le ha dado a esta problema es que:
  - El usuario envía una lista de empleados en un solo archivo para primero crear todos los empleados y agregarlos a datos del sistema.
  - Con los datos de los empleados registrados, se puede consultar el pago de cada empleado existente en el sistema y mostrarlosal cliente.
  - Las reglas de los horarios y dias establecidos para la paga por hora fueron:
    - Lunes a Viernes:
        - 00:01 - 09:00 25 USD
        - 09:01 - 18:00 15 USD
        - 18:01 - 00:00 20 USD
    - Sábado y Domingo
        - 00:01 - 09:00 30 USD
        - 09:01 - 18:00 20 USD
        - 18:01 - 00:00 25 USD
  - Con estas reglas se definió tres horarios: Madrugada, Dia y Noche, y la paga varia si es entre semana o fin de semana.
  - El usuario tiene la posibilidad de escoger su horario todo en un solo horario, o mezclado entre el primer, segundo o tercero, es decir, por ejemplo puede trabajar de 06:00 - 12:00 (primer y segundo horario), o de 16:00 - 21:00 (segundo y tercer horario), pero no entre 23:00 - 01:00 (tercer y primer horario), en este caso debe registrar un dia de 23:00 - 00:00 y otro dia de 00:00 - 01:00.
  - Si un elemento de la lista tiene algún error, este no es procesado, pero se da la posibilidad de pasar al siguiente elemento o empleado, en caso de este estar correcto se lo procesa.
  
- La metodología aplicada fue:
  - **Preparación:** 
    - Se inició estableciendo que objetivos, alcance y expectativas se espera de la realización de este sistema, como calcular los pagos de los empleados, un pequeño sistema funcional que solo ejecuta una función, el cálculo, pero que debe cumplir estándares de estructura y diseño.
  - **Planificación:** 
    - Se leyó detenidamente el ejercicio propuesto, sus requerimientos y que puntos de quiebre podría tener.
    - Se planificó para acabar en 5 días, y 2 días más en caso de retrasos propios o ajenos al proyecto, culminando en el tiempo máximo de entrega (7 días).
    - Se decidió que lenguaje de programación utilizar, JS, esto debido a la familiaridad más actual con éste, y en base a ello, la dependencia Jest para el testing.
    - Ya con el problema claro y con los requerimientos determinados, se definió que arquitectura usar, MVC, y que patrones de diseño podrían irse aplicando, no obstante en la implementación se variaron un poco. Y también se definió el modelo de datos, aunque no se guardó en una base de datos, se simuló esto con objetos.
  - **Ejecución:** 
    - Al tratarse de un proyecto muy pequeño, de tiempo de desarrollo de una semana y con una persona como developer, no se siguió todos las prácticas de Scrum, metodología para el desarrollo de software, pero si se siguieron ciertas prácticas el scrum daily o el scrum planning, de forma sencilla.
    - Se verificó que el ambiente de desarrollo esté actualizado, al igual que el IDE.
    - Se creó el proyecto.
    - Se instaló la librería para el test y se configuró en el proyecto.
    - Se fue desarrollando en base a lo planificado, tareas auto planificadas, y se hicieron tests cada cierta funcionalidad implementada.
    - El control del código se realizaba a diario, realizando modificaciones en caso de ser necesario.
    - Al finalizar la implementación, se verificó el funcionamiento completo de la aplicación.
  - **Cierre:**
    - Se concluyó el sistema con éxito, no existe puesta en producción, solo se lo subió a un repositorio en Github.
    
