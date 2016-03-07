@ECHO OFF

     IF "%1"=="?" GOTO Usage

     SET SwaggerUrl=%1
     IF "%SwaggerUrl%"=="" (
         SET SwaggerUrl=http://localhost:62276/swagger/docs/v1
     )
     IF "%SwaggerUrl%"=="""" (
         SET SwaggerUrl=http://localhost:62276/swagger/docs/v1
     )

     SET OutputFile=%2
     IF "%OutputFile%"=="" (
         SET OutputFile=.\client\modules\common\webservices\sierra.services.ts
     )

     ECHO Type UPDATE-SWAGGER ? to view help
     ECHO.
     ECHO Swagger source: %SwaggerUrl%
     ECHO Output file   : %OutputFile%

     .\tools\swagen\swagen.exe %SwaggerUrl% -out:%OutputFile% -modelns:sierra.model -servicens:sierra.service -ref:../../../../typings/tsd.d.ts -ref:../../../../typings/app.d.ts

     GOTO Exit

     :Usage

     ECHO Usage:
     ECHO.
     ECHO     UPDATE-SWAGGER [Swagger URL] [OutputFile]
     ECHO.
ECHO         Swagger URL (optional): Absolute URL to the Swagger definitions.
ECHO         Output file (optional): Absolute or relative path to file to save
ECHO                                 the generated Typescript code.
ECHO.
ECHO Note: If you want to specify the output file but not the Swagger URL,
ECHO       use "" for the Swagger URL.
ECHO.
ECHO Examples:
ECHO     UPDATE-SWAGGER
ECHO     UPDATE-SWAGGER http://service.com/swagger D:\Temp\Swagger.ts
ECHO     UPDATE-SWAGGER http://service.com/swagger
ECHO     UPDATE-SWAGGER "" D:\Temp\Swagger.ts
ECHO.

:Exit
