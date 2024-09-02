-- drop database SGME_MAKEE;
-- Cria o banco de dados
CREATE DATABASE SGME_MAKEE;

-- Usa o banco de dados criado
USE SGME_MAKEE;

-- Cria a tabela Clientes para armazenar informações dos clientes
CREATE TABLE Clientes (
    ClienteID INT AUTO_INCREMENT PRIMARY KEY,  -- Identificador único do cliente
    Nome VARCHAR(100) NOT NULL,                -- Nome do cliente
    Endereco VARCHAR(255),                     -- Endereço do cliente
    Telefone VARCHAR(15),                      -- Telefone do cliente
    Email VARCHAR(100) UNIQUE NOT NULL,        -- Email do cliente (único)
    DataNascimento DATE                        -- Data de nascimento do cliente
);
-- ----------------------------------------------------------------------------------------------------------
		-- Atualiza a tabela Clientes para relacionar com Usuarios
		ALTER TABLE Clientes
		ADD COLUMN UsuarioID INT UNIQUE,   -- Referência única ao UsuarioID na tabela Usuarios
		ADD FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID);  -- Chave estrangeira para Usuarios
-- ----------------------------------------------------------------------------------------------------------


-- Cria a tabela Produtos para armazenar informações dos produtos
CREATE TABLE Produtos (
    ProdutoID INT AUTO_INCREMENT PRIMARY KEY,  -- Identificador único do produto
    NomeProduto VARCHAR(100) NOT NULL,         -- Nome do produto
    Descricao TEXT,                            -- Descrição do produto
    Preco DECIMAL(10, 2) NOT NULL,             -- Preço do produto
    QuantidadeEmEstoque INT NOT NULL           -- Quantidade em estoque do produto
);

-- Cria a tabela Servicos para armazenar informações dos serviços
CREATE TABLE Servicos (
    ServicoID INT AUTO_INCREMENT PRIMARY KEY,  -- Identificador único do serviço
    NomeServico VARCHAR(100) NOT NULL,         -- Nome do serviço
    Descricao TEXT,                            -- Descrição do serviço
    Preco DECIMAL(10, 2) NOT NULL,             -- Preço do serviço
    Duracao TIME NOT NULL                      -- Duração do serviço
);

-- Cria a tabela Funcionarios para armazenar informações dos funcionários
CREATE TABLE Funcionarios (
    FuncionarioID INT AUTO_INCREMENT PRIMARY KEY, -- Identificador único do funcionário
    Nome VARCHAR(100) NOT NULL,                   -- Nome do funcionário
    Cargo VARCHAR(50),                            -- Cargo do funcionário
    Salario DECIMAL(10, 2),                       -- Salário do funcionário
    DataContratacao DATE                          -- Data de contratação do funcionário
);
-- ----------------------------------------------------------------------------------------------------------
		-- Atualiza a tabela Funcionarios para relacionar com Usuarios
		ALTER TABLE Funcionarios
		ADD COLUMN UsuarioID INT UNIQUE,   -- Referência única ao UsuarioID na tabela Usuarios
		ADD FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID);  -- Chave estrangeira para Usuarios
-- ----------------------------------------------------------------------------------------------------------

-- Cria a tabela FuncionarioServico para relacionar funcionários e serviços
CREATE TABLE FuncionarioServico (
    FuncionarioID INT,                            -- Referência ao funcionário (chave estrangeira)
    ServicoID INT,                                -- Referência ao serviço (chave estrangeira)
    PRIMARY KEY (FuncionarioID, ServicoID),       -- Chave composta
    FOREIGN KEY (FuncionarioID) REFERENCES Funcionarios(FuncionarioID),  -- Chave estrangeira para Funcionarios
    FOREIGN KEY (ServicoID) REFERENCES Servicos(ServicoID)               -- Chave estrangeira para Servicos
);

-- Cria a tabela Agendamentos para armazenar informações dos agendamentos de serviços
CREATE TABLE Agendamentos (
    AgendamentoID INT AUTO_INCREMENT PRIMARY KEY,  -- Identificador único do agendamento
    ClienteID INT,                                 -- Referência ao cliente que agendou (chave estrangeira)
    ServicoID INT,                                 -- Referência ao serviço agendado (chave estrangeira)
    FuncionarioID INT,                             -- Referência ao funcionário que executará o serviço (chave estrangeira)
    DataHoraAgendamento DATETIME NOT NULL,         -- Data e hora do agendamento
    Status ENUM('Pendente', 'Confirmado', 'Cancelado') DEFAULT 'Pendente',  -- Status do agendamento
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID),  -- Chave estrangeira para Clientes
    FOREIGN KEY (ServicoID) REFERENCES Servicos(ServicoID),  -- Chave estrangeira para Servicos
    FOREIGN KEY (FuncionarioID) REFERENCES Funcionarios(FuncionarioID)  -- Chave estrangeira para Funcionarios
);

-- Cria a tabela Usuarios para armazenar informações de login
CREATE TABLE Usuarios (
    UsuarioID INT AUTO_INCREMENT PRIMARY KEY,  -- Identificador único do usuário
    Email VARCHAR(100) UNIQUE NOT NULL,        -- Email do usuário (único)
    Senha VARCHAR(255) NOT NULL,               -- Senha do usuário
    TipoUsuario ENUM('Cliente', 'Funcionario') NOT NULL,  -- Tipo de usuário: Cliente ou Funcionario
    ClienteID INT NULL,                        -- Referência opcional ao ClienteID
    FuncionarioID INT NULL,                    -- Referência opcional ao FuncionarioID
    FOREIGN KEY (ClienteID) REFERENCES Clientes(ClienteID),  -- Chave estrangeira para Clientes
    FOREIGN KEY (FuncionarioID) REFERENCES Funcionarios(FuncionarioID)  -- Chave estrangeira para Funcionarios
);

