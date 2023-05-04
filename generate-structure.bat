@echo off

REM Features
md src\app\features\task\components
md src\app\features\task\containers
md src\app\features\task\services
md src\app\features\task\models
md src\app\features\authentication\components
md src\app\features\authentication\containers
md src\app\features\authentication\services
md src\app\features\authentication\models
md src\app\features\settings\containers
md src\app\features\user-profile\containers

REM Shared
md src\app\shared\header
md src\app\shared\footer
md src\app\shared\confirm-dialog

REM Assets
md src\assets\images
md src\assets\icons

REM Styles
md src\styles

echo Estrutura de pastas criada com sucesso.

call ng generate module features/task --flat false --routing
call ng generate module features/authentication --flat false --routing
call ng generate module features/settings --flat false --routing
call ng generate module features/user-profile --flat false --routing
call ng generate module shared --flat false

call ng generate component features/task/components/task-list
call ng generate component features/task/components/task-item
call ng generate component features/task/components/task-form
call ng generate component features/authentication/components/login
call ng generate component features/authentication/components/register
call ng generate component shared/header
call ng generate component shared/footer
call ng generate component shared/confirm-dialog

call ng generate service features/task/services/task
call ng generate service features/authentication/services/auth

call ng generate class features/task/models/task
call ng generate class features/authentication/models/user

call ng generate guard guards/auth
call ng generate interceptor interceptors/auth

echo Todos os componentes, módulos, serviços e arquivos necessários foram gerados.
pause