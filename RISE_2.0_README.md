# RISE 2.0

## Product, UX/UI, funcionalidad y arquitectura

> **Rise convierte el desarrollo personal en una experiencia de
> progreso.**
>
> La idea central: **tu vida es el juego, tú eres el personaje y cada
> acción real construye tu progreso.**

------------------------------------------------------------------------

# 1. Visión del proyecto

Rise es una aplicación de desarrollo personal que busca ayudar al
usuario a mejorar de forma constante en diferentes áreas de su vida.

No debe ser simplemente un habit tracker ni una aplicación de
productividad.

Rise debe combinar:

-   hábitos
-   gamificación
-   misiones
-   niveles
-   atributos
-   progreso
-   entrenamiento
-   nutrición
-   finanzas
-   diario
-   objetivos
-   inteligencia artificial

La gamificación debe generar compromiso con uno mismo, no dependencia de
la aplicación.

El usuario debe sentir que cada pequeña acción tiene significado porque
puede observar cómo se acumula y transforma su progreso.

La experiencia debe comunicar:

**"Estoy construyendo mi vida y puedo ver mi progreso."**

------------------------------------------------------------------------

# 2. Objetivo emocional

Rise debe conseguir que el usuario:

1.  Entienda rápidamente cómo está avanzando.
2.  Encuentre fácilmente qué puede hacer hoy.
3.  Reciba una recompensa visual por las acciones importantes.
4.  Vea su evolución con el tiempo.
5.  Encuentre utilidad real en la aplicación.
6.  Quiera volver porque desea continuar su progreso.

El objetivo final no es que el usuario pase mucho tiempo dentro de Rise.

El objetivo es que **Rise le ayude a pasar más tiempo viviendo mejor
fuera de Rise**.

------------------------------------------------------------------------

# 3. Principios de producto

## 3.1 Simplicidad

La interfaz debe ser sencilla de entender.

No simplificar eliminando funciones importantes, sino organizándolas
correctamente.

## 3.2 Profundidad

La pantalla inicial debe ser sencilla, pero la aplicación debe ofrecer
información profunda cuando el usuario quiera explorar.

## 3.3 Progreso visible

Las acciones deben alimentar sistemas de progreso:

**acción → feedback → XP → progreso → evolución**

## 3.4 Gamificación elegante

Rise puede tener elementos propios de un videojuego, pero no debe
parecer un videojuego infantil.

Evitar:

-   confeti constante
-   monedas innecesarias
-   efectos excesivos
-   barras por todas partes
-   colores sin propósito
-   estética infantil
-   recompensas sin significado

## 3.5 Utilidad antes que decoración

Cada elemento visual debe tener una función.

El diseño atractivo no debe perjudicar:

-   legibilidad
-   rendimiento
-   navegación
-   accesibilidad
-   comprensión

------------------------------------------------------------------------

# 4. Dirección visual

La referencia principal es la filosofía de diseño de Apple/iOS:

-   claridad
-   jerarquía
-   espacios
-   continuidad
-   interacción directa
-   movimiento natural
-   profundidad
-   componentes consistentes
-   interfaces que responden al usuario

No copiar literalmente iOS.

Rise debe tener identidad propia.

La dirección visual es:

**Liquid Glass Soft + iOS + gamificación elegante + calidez +
simplicidad sofisticada.**

La interfaz no debe sentirse:

-   robótica
-   fría
-   excesivamente futurista
-   sobrecargada
-   plana
-   aburrida

------------------------------------------------------------------------

# 5. Liquid Glass Soft

El Liquid Glass debe utilizarse con moderación.

Usar:

-   transparencias
-   blur moderado
-   superficies translúcidas
-   bordes sutiles
-   sombras suaves
-   profundidad
-   capas
-   iluminación ambiental
-   gradientes controlados
-   esquinas redondeadas

No convertir toda la aplicación en vidrio.

No crear una colección de paneles de cristal apilados.

Las superficies principales pueden usar Liquid Glass mientras que otros
elementos pueden ser sólidos o más simples.

La interfaz debe conservar contraste y legibilidad incluso con glass.

------------------------------------------------------------------------

# 6. Temas visuales

Rise debe permitir escoger entre tres experiencias visuales.

## 6.1 Dark Premium

Características:

-   negro y grafito
-   superficies profundas
-   Liquid Glass Soft
-   iluminación ambiental discreta
-   contraste elegante
-   apariencia premium y tecnológica sin ser fría

## 6.2 Light + Dark

Debe incluir:

-   modo claro
-   modo oscuro
-   modo automático según el sistema

El usuario debe poder cambiar el tema sin recargar la aplicación.

El cambio debe tener una transición visual suave.

## 6.3 Rise Identity

Mantiene el naranja como color característico de Rise.

El naranja debe ser principalmente un color de acento.

Usarlo especialmente para:

-   XP
-   progreso
-   acciones importantes
-   estados destacados
-   elementos de identidad

No utilizar naranja como fondo dominante.

------------------------------------------------------------------------

# 7. Tipografía y legibilidad

La legibilidad es una prioridad absoluta.

Los textos deben:

-   tener tamaño suficiente
-   tener contraste suficiente
-   mantener una jerarquía clara
-   utilizar pesos tipográficos coherentes
-   contar con espacios adecuados

No reducir el tamaño de texto simplemente para que quepan más elementos.

Evitar texto sobre fondos demasiado complejos.

Los números importantes deben destacar.

Los títulos, subtítulos, datos secundarios y botones deben poder
diferenciarse rápidamente.

**Una interfaz premium nunca debe ser difícil de leer.**

------------------------------------------------------------------------

# 8. Arquitectura de navegación

La navegación principal se organiza alrededor de:

## Inicio

Estado actual del día.

## Misiones

Objetivos diarios, semanales y desafíos.

## Evolución

XP, niveles, atributos, estadísticas y progreso.

## Vida

Entrenamiento, nutrición, finanzas, diario y tareas.

## Perfil

Nivel, logros, personalización y configuración.

La navegación debe funcionar especialmente bien en móvil.

Debe sentirse natural en Android WebView, PWA y posteriormente en otras
plataformas.

------------------------------------------------------------------------

# 9. Inicio

Inicio es el corazón de Rise.

Debe mostrar de forma priorizada:

-   saludo
-   fecha
-   progreso del día
-   hábitos pendientes
-   XP
-   nivel
-   racha
-   misión actual
-   resumen del día
-   información contextual

No mostrar todos los datos con el mismo peso visual.

La pantalla debe adaptarse al estado del usuario.

Un día avanzado debe transmitir progreso.

Un día recién iniciado debe mostrar claramente qué puede hacer el
usuario a continuación.

------------------------------------------------------------------------

# 10. Gamificación

El sistema de gamificación es una capa transversal de Rise.

Debe incluir:

-   XP
-   niveles
-   rangos
-   atributos
-   rachas
-   misiones
-   logros
-   recompensas
-   progreso histórico

La gamificación debe estar integrada dentro de las funciones reales de
la aplicación.

No crear una sección de juego separada que desconecte el progreso de la
vida real.

------------------------------------------------------------------------

# 11. Niveles y rangos

Mantener el concepto de niveles y mejorarlo visualmente.

Rangos iniciales propuestos:

1.  Recluta
2.  Aprendiz
3.  Constante
4.  Disciplinado
5.  Determinado
6.  Enfocado
7.  Resiliente
8.  Imparable
9.  Maestro
10. Ascendido

El sistema debe poder ampliarse posteriormente.

El nivel se obtiene mediante progreso real y XP.

------------------------------------------------------------------------

# 12. Atributos

Los atributos representan áreas de evolución personal.

Propuesta inicial:

-   Disciplina
-   Salud
-   Enfoque
-   Aprendizaje
-   Finanzas
-   Bienestar

Los atributos no deben poder modificarse manualmente.

Deben evolucionar a partir de acciones.

Ejemplos:

-   Entrenar → Salud
-   Leer → Aprendizaje
-   Ahorrar → Finanzas
-   Reducir celular → Enfoque
-   Completar hábitos → Disciplina

La arquitectura debe permitir agregar atributos posteriormente.

------------------------------------------------------------------------

# 13. XP

Cada acción relevante puede otorgar XP.

Debe existir:

-   XP actual
-   XP necesario para el siguiente nivel
-   progreso hacia el siguiente nivel
-   historial de XP

Al obtener XP:

-   mostrar feedback inmediato
-   actualizar el indicador de XP
-   actualizar el progreso
-   actualizar atributos si corresponde

La animación debe ser corta y satisfactoria.

------------------------------------------------------------------------

# 14. Misiones

Las misiones convierten objetivos en acciones concretas.

Tipos:

### Diarias

Objetivos del día.

### Semanales

Objetivos de mayor duración.

### Desafíos

Retos especiales.

Cada misión debe tener:

-   nombre
-   descripción
-   progreso
-   dificultad
-   recompensa
-   estado
-   fecha o tiempo restante cuando corresponda

La arquitectura debe permitir que posteriormente la IA genere
recomendaciones o misiones personalizadas.

------------------------------------------------------------------------

# 15. Rachas

Mantener:

-   racha actual
-   mejor racha
-   historial
-   días construidos

Las rachas deben motivar, no castigar.

Si el usuario falla, Rise debe facilitar su regreso.

Evitar que una racha sea el único indicador de éxito.

------------------------------------------------------------------------

# 16. Hábitos

Mantener y mejorar completamente el sistema actual de hábitos.

Debe permitir:

-   hábitos predeterminados
-   hábitos personalizados
-   completar hábitos
-   editar hábitos personalizados
-   eliminar hábitos personalizados
-   ocultar hábitos fijos
-   ordenar hábitos
-   categorías
-   iconos
-   XP
-   objetivos diarios
-   descripciones
-   rachas

Los hábitos predeterminados y personalizados deben distinguirse
correctamente.

Los hábitos personalizados deben poder editarse.

El modo de edición debe funcionar sin provocar desaparición de hábitos
ni pérdida de información.

------------------------------------------------------------------------

# 17. Modo de edición de hábitos

Cuando el usuario active **Editar hábitos**, reemplazar el botón normal
por dos acciones:

-   botón rojo con icono de salir para abandonar el modo edición
-   botón verde con icono "+" para agregar hábitos

Estos dos botones solo deben aparecer durante el modo de edición.

Fuera del modo de edición, debe mostrarse nuevamente la acción normal.

------------------------------------------------------------------------

# 18. Completar un hábito

Al completar un hábito:

1.  El control responde inmediatamente.
2.  Se comprime ligeramente.
3.  Aparece el check.
4.  Cambia el estado visual.
5.  Aparece discretamente el XP ganado.
6.  Se actualiza el progreso del día.
7.  Se actualiza el XP global.
8.  Se actualizan atributos.
9.  Se actualiza una misión si corresponde.
10. Se desbloquea un logro si corresponde.

No bloquear la interacción durante la animación.

------------------------------------------------------------------------

# 19. Movimiento y animaciones

Crear un sistema global y reutilizable de motion.

Debe contemplar:

-   fade
-   scale
-   slide
-   spring
-   expansión
-   reducción
-   transformación
-   navegación
-   feedback
-   aparición y desaparición
-   gestos

Las animaciones deben ser:

-   rápidas
-   naturales
-   consistentes
-   intencionales

No animar elementos permanentemente.

**La animación debe responder a una acción o aportar información.**

------------------------------------------------------------------------

# 20. Seguimiento del dedo

La interacción táctil es una característica importante.

Cuando el usuario arrastre un elemento, este debe responder directamente
al movimiento del dedo.

Ejemplos:

-   panel inferior que sigue el dedo
-   tarjetas que reaccionan al drag
-   elementos que cambian ligeramente de escala
-   sheets que se pueden cerrar mediante swipe

Al soltar:

-   si no supera el umbral → vuelve con spring
-   si supera el umbral → completa la transición

No crear gestos artificiales.

Cada gesto debe resolver una necesidad real.

------------------------------------------------------------------------

# 21. Transiciones

Las pantallas deben mantener continuidad espacial.

Evitar:

**pantalla desaparece → pantalla nueva aparece.**

Preferir:

**elemento seleccionado → se transforma → contenido relacionado se
expande.**

Ejemplos:

-   tarjeta de progreso → Evolución
-   misión → detalle de misión
-   hábito → detalle del hábito
-   resumen financiero → Finanzas

Las transiciones deben comunicar de dónde viene el contenido.

------------------------------------------------------------------------

# 22. Haptics

Cuando el dispositivo lo permita, preparar feedback háptico para
acciones importantes:

-   completar hábito
-   completar misión
-   subir de nivel
-   desbloquear logro
-   confirmar acciones relevantes

No usar vibración constantemente.

------------------------------------------------------------------------

# 23. Modales y Bottom Sheets

Priorizar Bottom Sheets en móvil cuando sea apropiado.

Deben incluir:

-   blur
-   profundidad
-   transparencia
-   esquinas superiores redondeadas
-   animación
-   barra de arrastre cuando corresponda
-   drag
-   cierre mediante gesto cuando sea apropiado

El panel debe seguir el dedo durante el movimiento.

------------------------------------------------------------------------

# 24. Botones

Estados:

-   normal
-   hover
-   pressed
-   disabled
-   loading
-   success

Al presionar:

-   ligera reducción de escala
-   cambio sutil de profundidad

Al soltar:

-   regreso mediante spring rápido

No utilizar botones gigantes sin necesidad.

Las acciones principales deben destacar claramente.

------------------------------------------------------------------------

# 25. Tarjetas

No convertir cada elemento en una tarjeta.

Utilizar tarjetas únicamente cuando ayuden a agrupar información.

Crear niveles de importancia:

-   contenido principal
-   contenido secundario
-   información contextual

Las tarjetas principales pueden utilizar Liquid Glass.

Las secundarias pueden ser más sencillas.

------------------------------------------------------------------------

# 26. Scroll

El desplazamiento debe sentirse natural.

Utilizar:

-   scroll suave
-   momentum
-   headers adaptativos cuando tenga sentido
-   reacciones sutiles al desplazamiento

Evitar parallax exagerado.

------------------------------------------------------------------------

# 27. Microinteracciones

Acciones importantes deben generar feedback.

Ejemplos:

-   completar hábito → check + XP
-   subir nivel → transición especial
-   completar misión → recompensa
-   cambiar tema → transición
-   guardar diario → confirmación
-   registrar gasto → actualización inmediata
-   registrar entrenamiento → actualización del progreso
-   analizar comida → procesamiento → resultado

Las microinteracciones deben ser discretas y útiles.

------------------------------------------------------------------------

# 28. Evolución

Evolución es una de las pantallas principales de Rise.

Mostrar:

-   nivel
-   XP
-   progreso
-   atributos
-   estadísticas
-   rachas
-   evolución temporal

Las gráficas deben ser:

-   limpias
-   interactivas
-   fáciles de leer
-   visualmente integradas con Rise

Al tocar o deslizar sobre un gráfico, mostrar el dato correspondiente.

No saturar la pantalla.

------------------------------------------------------------------------

# 29. Logros y recompensas

Los logros representan hitos reales.

Ejemplos:

-   primer hábito completado
-   7 días
-   30 días
-   100 hábitos
-   semana de alta consistencia
-   recuperación de una racha

Las recompensas pueden incluir:

-   títulos
-   elementos visuales
-   temas
-   efectos
-   personalización
-   futuras funciones

No utilizar efectos exagerados.

------------------------------------------------------------------------

# 30. Entrenamiento

Entrenamiento debe ser una sección funcional y visualmente atractiva.

Mantener:

-   rutinas
-   sesiones
-   progreso
-   agua
-   objetivos
-   historial

Mostrar:

-   entrenamiento recomendado
-   progreso
-   sesiones realizadas
-   racha
-   estadísticas
-   recuperación
-   historial

Debe quedar preparada para que posteriormente la IA pueda analizar:

-   entrenamientos
-   frecuencia
-   duración
-   objetivos
-   progreso
-   descanso

y generar recomendaciones.

------------------------------------------------------------------------

# 31. Nutrición

La nutrición debe integrarse como parte de Vida.

Debe existir una función para analizar una comida mediante fotografía.

El usuario podrá:

-   tomar una foto
-   seleccionar una foto
-   enviarla al servicio de IA posteriormente

El sistema debe quedar preparado para identificar aproximadamente:

-   alimentos
-   proteínas
-   carbohidratos
-   grasas
-   calorías
-   fibra
-   otros datos nutricionales relevantes

Los resultados deben mostrarse como **estimaciones**.

Una fotografía no puede determinar con exactitud el peso de cada
alimento o todos sus ingredientes.

Después del análisis puede aparecer:

### Consejo de Rise

Una recomendación general relacionada con la alimentación y el contexto
disponible.

La experiencia debe centrarse en alimentación equilibrada, energía,
recuperación y hábitos saludables.

------------------------------------------------------------------------

# 32. IA

La IA no debe ser el centro visual de Rise.

Debe funcionar como un **mentor inteligente** integrado dentro de las
diferentes áreas.

Principales aplicaciones:

## Nutrición

Análisis de fotografías y orientación nutricional.

## Entrenamiento

Recomendaciones basadas en actividad, objetivos e historial.

## Finanzas

Análisis de gastos, presupuestos, patrones y objetivos.

La arquitectura debe permitir incorporar nuevas funciones de IA
posteriormente.

------------------------------------------------------------------------

# 33. IA financiera

Debe poder analizar:

-   gastos
-   ingresos
-   categorías
-   tendencias
-   gastos recurrentes
-   presupuestos
-   ahorro
-   objetivos

Debe identificar patrones y explicar las recomendaciones.

No limitarse a decir:

"Gasta menos."

Debe explicar el contexto.

------------------------------------------------------------------------

# 34. Chat financiero

Preparar una interfaz para preguntas como:

-   "¿En qué gasté más este mes?"
-   "¿Cómo voy con mi ahorro?"
-   "¿Cuáles fueron mis gastos más altos?"
-   "¿Estoy gastando más que el mes pasado?"
-   "Ayúdame a organizar mi presupuesto."

La IA debe utilizar los datos disponibles del usuario.

No inventar información.

------------------------------------------------------------------------

# 35. Finanzas

Finanzas debe ser sencilla y no parecer una aplicación bancaria
compleja.

Debe incluir:

-   ingresos
-   gastos
-   categorías
-   categorías personalizadas
-   historial
-   filtros
-   búsqueda
-   estadísticas
-   gráficos
-   presupuestos
-   objetivos de ahorro

------------------------------------------------------------------------

# 36. Resumen financiero

Mostrar rápidamente:

-   dinero disponible
-   ingresos
-   gastos
-   ahorro
-   presupuesto disponible
-   comparación con periodos anteriores

Utilizar números claros y jerarquía visual.

------------------------------------------------------------------------

# 37. Registro de ingresos y gastos

Permitir registrar:

-   tipo
-   valor
-   categoría
-   fecha
-   descripción
-   método de pago
-   notas opcionales

La experiencia debe ser rápida.

Flujo ideal:

**+ → valor → categoría → guardar**

Los campos secundarios no deben ser obligatorios.

Al guardar:

-   cerrar el panel suavemente
-   actualizar balance
-   actualizar estadísticas
-   actualizar gráficos
-   mostrar confirmación

------------------------------------------------------------------------

# 38. Categorías financieras

Mantener categorías predeterminadas y permitir categorías
personalizadas.

Permitir:

-   agregar
-   editar cuando corresponda
-   eliminar cuando sea seguro
-   iconos
-   identificación visual

No limitar innecesariamente al usuario.

------------------------------------------------------------------------

# 39. Historial financiero

Mostrar movimientos cronológicamente.

Cada movimiento debe mostrar:

-   icono
-   descripción
-   fecha
-   valor
-   tipo

Permitir:

-   editar
-   eliminar
-   buscar
-   filtrar

Filtros:

-   ingresos
-   gastos
-   categoría
-   periodo

------------------------------------------------------------------------

# 40. Gráficas financieras

Incluir inicialmente:

-   gastos por categoría
-   ingresos vs gastos
-   evolución del ahorro
-   evolución del gasto

Las gráficas deben ser limpias e interactivas.

No llenar la pantalla de gráficos.

------------------------------------------------------------------------

# 41. Presupuestos

Permitir establecer presupuestos:

-   mensuales
-   por categoría

Mostrar:

-   utilizado
-   disponible
-   porcentaje utilizado

Las alertas deben ser discretas.

------------------------------------------------------------------------

# 42. Objetivos de ahorro

Permitir crear:

-   nombre
-   cantidad objetivo
-   cantidad actual
-   fecha objetivo
-   descripción opcional

Mostrar visualmente el progreso.

Los objetivos pueden integrarse posteriormente con misiones y XP.

------------------------------------------------------------------------

# 43. Integración de Finanzas con Rise

Las acciones financieras positivas pueden generar progreso.

Ejemplos:

-   registrar gastos → XP pequeño
-   completar objetivo de ahorro → XP
-   mantener presupuesto → misión
-   completar meta → logro

No recompensar simplemente por gastar.

Priorizar:

-   organización
-   planificación
-   ahorro
-   seguimiento
-   constancia

------------------------------------------------------------------------

# 44. Diario

Mantener:

-   reflexiones diarias
-   historial
-   reflexión mensual
-   registro de lectura

El diseño debe sentirse personal y tranquilo.

Preparar la arquitectura para futuras funciones de IA relacionadas con
reflexión y patrones de productividad.

------------------------------------------------------------------------

# 45. Tareas

Mantener:

-   crear tareas
-   completar tareas
-   eliminar tareas
-   categorías
-   horarios
-   recordatorios

La experiencia debe ser rápida y visualmente coherente con Rise.

------------------------------------------------------------------------

# 46. Perfil

Perfil debe representar al usuario y su evolución.

Mostrar:

-   nivel
-   rango
-   XP
-   racha
-   logros
-   atributos
-   progreso
-   personalización

No debe parecer únicamente una página de configuración.

------------------------------------------------------------------------

# 47. Personalización

Preparar el sistema para personalización futura.

Posibles elementos:

-   temas
-   elementos visuales
-   títulos
-   efectos
-   avatares
-   recompensas cosméticas

Los elementos avanzados pueden desbloquearse posteriormente.

------------------------------------------------------------------------

# 48. Arquitectura de código

Si el proyecto actual está concentrado en pocos archivos, reorganizarlo
progresivamente.

Separar responsabilidades.

Propuesta:

``` text
src/
├── core/
│   ├── state
│   ├── storage
│   ├── events
│   └── navigation
│
├── game/
│   ├── xp
│   ├── levels
│   ├── attributes
│   ├── missions
│   ├── achievements
│   └── rewards
│
├── life/
│   ├── habits
│   ├── training
│   ├── nutrition
│   ├── finance
│   ├── diary
│   ├── tasks
│   └── goals
│
├── ui/
│   ├── components
│   ├── modals
│   ├── sheets
│   ├── gestures
│   ├── animations
│   └── themes
│
└── ai/
    ├── AIService
    ├── nutrition
    ├── training
    ├── finance
    └── recommendations
```

La estructura real puede adaptarse al proyecto existente.

No reorganizar archivos únicamente por estética.

La separación debe mejorar mantenibilidad y escalabilidad.

------------------------------------------------------------------------

# 49. Estado y almacenamiento

Mantener el sistema actual de almacenamiento mientras se construye una
transición segura.

Los datos existentes no deben desaparecer.

Especial atención a:

-   hábitos
-   hábitos personalizados
-   orden
-   días completados
-   XP
-   niveles
-   rachas
-   sesiones
-   agua
-   diario
-   reflexiones
-   lectura
-   objetivos
-   finanzas
-   categorías
-   tareas
-   logros
-   configuraciones

Implementar versionado de datos y migraciones cuando sea necesario.

Nunca sobrescribir datos existentes de forma destructiva.

------------------------------------------------------------------------

# 50. Backend y Python

Utilizar Python cuando sea necesario y aporte valor.

Puede utilizarse para:

-   backend
-   API
-   autenticación futura
-   servicios de IA
-   procesamiento
-   migraciones
-   lógica de servidor
-   integraciones futuras

La arquitectura objetivo puede evolucionar hacia:

**Frontend → API/backend → base de datos → servicios de IA**

No agregar Python únicamente por utilizarlo.

Debe mantenerse una arquitectura sencilla y mantenible.

------------------------------------------------------------------------

# 51. IA preparada desde ahora

La aplicación debe funcionar aunque todavía no exista una API de IA
conectada.

Crear una capa desacoplada, por ejemplo:

**AIService**

Esta capa debe permitir posteriormente conectar un proveedor real.

Preparar:

-   modelos de datos
-   interfaces
-   estados de carga
-   errores
-   respuestas estructuradas
-   estados offline
-   endpoints futuros

No colocar API keys en el frontend.

No presentar respuestas simuladas como si fueran IA real.

------------------------------------------------------------------------

# 52. Seguridad

Preparar desde el principio una arquitectura compatible con
autenticación segura.

Nunca:

-   guardar secretos en frontend
-   exponer API keys
-   confiar en datos enviados por el cliente
-   implementar autenticación real únicamente con localStorage

Preparar:

-   validación en servidor
-   sanitización de entradas
-   protección contra XSS
-   HTTPS en producción
-   sesiones/tokens seguros
-   autorización por usuario
-   recuperación de cuenta
-   separación entre usuarios
-   protección de endpoints

------------------------------------------------------------------------

# 53. Inicio de sesión futuro

La aplicación debe poder evolucionar desde:

**modo local → cuenta → nube**

sin perder información.

Preparar posteriormente:

-   crear cuenta
-   iniciar sesión
-   cerrar sesión
-   recuperación de contraseña
-   sesión persistente
-   perfil
-   sincronización

El inicio de sesión no debe ser obligatorio mientras la versión local
siga funcionando.

------------------------------------------------------------------------

# 54. Privacidad

Especial atención a datos:

-   financieros
-   nutricionales
-   entrenamiento
-   diarios
-   hábitos

Cuando se incorpore IA real, definir claramente qué información se envía
a servicios externos.

No enviar información innecesaria.

Los datos deben estar aislados por usuario cuando exista backend.

------------------------------------------------------------------------

# 55. Sincronización futura

Preparar la arquitectura para:

-   sincronización entre dispositivos
-   backup
-   recuperación
-   resolución de conflictos
-   almacenamiento remoto

El usuario no debería perder su progreso al pasar de la versión local a
una versión con cuenta.

------------------------------------------------------------------------

# 56. PWA y Android WebView

Mantener compatibilidad con:

-   navegador
-   PWA
-   Android WebView

Comprobar:

-   JavaScript
-   almacenamiento
-   manifest
-   service worker
-   navegación
-   assets
-   notificaciones cuando sean compatibles

Evitar tecnologías que provoquen pantalla negra o problemas en WebView
sin proporcionar una alternativa compatible.

------------------------------------------------------------------------

# 57. Responsive

Diseñar primero para móvil.

Prioridades:

-   botones táctiles
-   espacios adecuados
-   texto legible
-   navegación sencilla
-   gestos naturales
-   contenido sin desbordamientos

En escritorio, mantener una experiencia centrada y coherente con la
versión móvil.

------------------------------------------------------------------------

# 58. Rendimiento

Rise debe funcionar correctamente en teléfonos de gama baja y media.

Priorizar:

-   animaciones eficientes
-   GPU cuando corresponda
-   evitar renderizados innecesarios
-   evitar listeners innecesarios
-   lazy rendering cuando sea conveniente
-   optimización de imágenes
-   cálculos eficientes
-   uso moderado de blur

Liquid Glass no debe convertirse en un problema de rendimiento.

------------------------------------------------------------------------

# 59. Accesibilidad

Mantener:

-   contraste suficiente
-   tamaños táctiles adecuados
-   etiquetas accesibles
-   jerarquía clara
-   navegación comprensible
-   soporte para `prefers-reduced-motion`

Los estados no deben depender únicamente del color.

------------------------------------------------------------------------

# 60. Funciones futuras

Estas funciones no son prioridad para la primera versión, pero la
arquitectura debe permitirlas.

## Comunidad

-   amigos
-   perfiles
-   interacciones
-   retos

## Competencia

-   leaderboards
-   desafíos
-   temporadas
-   eventos

## Integraciones

-   Strava
-   MyFitnessPal
-   otras plataformas de salud y entrenamiento

## Personalización

-   avatares
-   tienda
-   elementos cosméticos
-   títulos
-   efectos

## Competición avanzada

-   PvP
-   desafíos entre usuarios

No implementar estas funciones prematuramente si afectan la calidad del
núcleo.

------------------------------------------------------------------------

# 61. Monetización

Modelo recomendado:

## Free

Debe permitir experimentar realmente Rise.

Incluir:

-   hábitos
-   XP
-   niveles
-   misiones básicas
-   atributos
-   finanzas básicas
-   entrenamiento básico
-   diario
-   estadísticas básicas
-   logros básicos
-   temas

## Premium

Puede incluir:

-   IA avanzada
-   análisis nutricional mediante fotografía
-   análisis financiero avanzado
-   recomendaciones de entrenamiento personalizadas
-   estadísticas avanzadas
-   gráficas avanzadas
-   sincronización en la nube
-   backup automático
-   personalización avanzada
-   futuras funciones exclusivas

La versión gratuita no debe sentirse inútil.

Principio:

**Free permite construir el hábito. Premium ayuda a construirlo mejor.**

Precio inicial a evaluar:

-   aproximadamente \$4.99 USD/mes
-   aproximadamente \$39.99 USD/año

Estos precios deben validarse posteriormente según costos de IA,
infraestructura y comportamiento de usuarios.

------------------------------------------------------------------------

# 62. Publicidad

Evitar publicidad invasiva.

Si en el futuro existe publicidad en Free:

-   no debe interrumpir acciones importantes
-   no debe destruir la experiencia
-   no debe parecer parte del contenido
-   Premium debería poder ofrecer una experiencia sin publicidad

------------------------------------------------------------------------

# 63. Analytics

Utilizar analítica de producto respetando la privacidad.

Medir inicialmente:

-   usuarios activos
-   retención
-   hábitos creados
-   hábitos completados
-   frecuencia de uso
-   misiones completadas
-   funciones utilizadas
-   abandono

No rastrear información innecesaria.

------------------------------------------------------------------------

# 64. Lanzamiento

Estrategia inicial:

### Etapa 1

Web/PWA + Android.

### Etapa 2

Publicación en Google Play cuando la versión Android sea estable.

### Etapa 3

iOS cuando la base del producto esté consolidada.

Región inicial:

**Colombia**

Arquitectura preparada para:

**Latinoamérica → español internacional → mercado global.**

Marketing inicial:

-   TikTok
-   Instagram
-   contenido corto
-   demostraciones
-   retos
-   progreso
-   hábitos
-   desarrollo personal

La comunicación debe mostrar cómo se siente utilizar Rise y qué problema
resuelve.

------------------------------------------------------------------------

# 65. Versionado

No definir el lanzamiento únicamente por fecha.

Etapas:

-   `0.x` → desarrollo
-   `0.9` → beta
-   `1.0` → primera versión pública estable
-   `1.x` → mejoras y funciones
-   `2.0` → evolución mayor

La versión 1.0 debe lanzarse cuando el núcleo sea estable, atractivo y
probado con usuarios reales.

------------------------------------------------------------------------

# 66. Prioridades del proyecto

Orden recomendado:

1.  UX y diseño
2.  Funcionalidad
3.  Privacidad y seguridad
4.  Escalabilidad
5.  Monetización
6.  Comunidad

El diseño es importante porque Rise necesita conseguir que el usuario
quiera volver.

Pero la utilidad real siempre debe estar por encima de la decoración.

------------------------------------------------------------------------

# 67. MVP

La primera versión debe concentrarse en el núcleo:

-   hábitos
-   XP
-   niveles
-   misiones
-   atributos
-   rachas
-   logros
-   finanzas
-   entrenamiento
-   nutrición
-   diario
-   tareas
-   objetivos
-   estadísticas
-   sistema visual
-   animaciones
-   gestos
-   temas
-   arquitectura preparada para IA
-   arquitectura preparada para cuentas y seguridad

La comunidad, PvP, marketplace, integraciones externas y personalización
avanzada quedan para fases posteriores.

------------------------------------------------------------------------

# 68. Metodología de desarrollo

Antes de modificar el código:

**analizar → planificar → reorganizar → implementar → probar →
corregir**

La IA de código debe:

1.  Analizar el proyecto existente.
2.  Identificar funciones actuales.
3.  Identificar datos almacenados.
4.  Detectar problemas de arquitectura.
5.  Crear un plan de migración.
6.  Implementar por módulos.
7.  Probar cada módulo.
8.  Corregir errores.
9.  Comprobar que las funciones existentes siguen funcionando.

No realizar una reescritura destructiva.

------------------------------------------------------------------------

# 69. Regla de oro para el código

**No romper lo que ya funciona.**

Antes de eliminar o reemplazar una función existente:

-   identificar qué hace
-   identificar qué datos utiliza
-   identificar qué otras partes dependen de ella
-   reemplazarla de forma compatible
-   probar el flujo completo

La nueva interfaz no debe provocar pérdida de funcionalidades.

------------------------------------------------------------------------

# 70. Checklist funcional

Antes de considerar una versión estable, comprobar:

## Hábitos

-   crear
-   editar
-   eliminar
-   ocultar
-   ordenar
-   completar
-   XP
-   rachas
-   categorías
-   hábitos personalizados

## Gamificación

-   XP
-   niveles
-   rangos
-   atributos
-   misiones
-   logros
-   recompensas
-   rachas

## Entrenamiento

-   crear/realizar sesiones
-   historial
-   progreso
-   agua
-   objetivos

## Nutrición

-   registro
-   interfaz de fotografía
-   estados de análisis
-   resultados preparados para IA

## Finanzas

-   ingresos
-   gastos
-   categorías
-   categorías personalizadas
-   historial
-   filtros
-   gráficos
-   presupuestos
-   ahorro
-   objetivos

## Diario

-   crear reflexión
-   guardar
-   consultar historial
-   lectura

## Tareas

-   crear
-   completar
-   eliminar
-   categorías
-   horarios
-   recordatorios

## UX/UI

-   navegación
-   modales
-   bottom sheets
-   gestos
-   seguimiento del dedo
-   animaciones
-   temas
-   responsive
-   legibilidad

## Datos

-   almacenamiento
-   migración
-   exportación/importación si existe
-   persistencia
-   recuperación

## Plataforma

-   PWA
-   Android WebView
-   responsive
-   rendimiento

------------------------------------------------------------------------

# 71. Criterio final de calidad

Rise debe sentirse como un producto real.

No como:

-   un proyecto escolar
-   una página web con tarjetas
-   un dashboard empresarial
-   un videojuego infantil
-   una demostración de efectos visuales

Debe sentirse como una aplicación que podría utilizar una persona todos
los días.

La experiencia ideal es:

**Abro Rise → entiendo mi estado → hago una acción → recibo feedback →
veo progreso → tomo una mejor decisión → cierro la aplicación → vuelvo
mañana.**

------------------------------------------------------------------------

# 72. Filosofía final

Rise no debe intentar controlar la vida del usuario.

Debe ayudarlo a tomar el control.

La aplicación no debe decir:

**"Necesitas usarme todos los días."**

Debe conseguir que el usuario piense:

**"Quiero ver cómo estoy avanzando."**

Y finalmente:

# RISE

**No se trata solamente de subir de nivel dentro de una aplicación.**

**Se trata de subir de nivel en tu propia vida.**
