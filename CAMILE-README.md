# Estudos da Camile · Método ET

Versão local inicial: 1.0.0-camile  
Foco: CGU · Auditoria e Fiscalização

## Ciclo inicial
1. Português — Marcello Giulian — referência mínima de 1h
2. Direito Constitucional — referência mínima de 1h
3. Informática e Dados — referência mínima de 1h

O tempo continua sendo real e livre: 1h é referência mínima do ciclo, não preenchimento artificial.

## Informática e Dados
Primeira passagem:
Windows 11 → Word → Excel → PowerPoint → Correio Eletrônico → Navegadores → Busca/grupos/redes sociais → Hardware e Software → Microsoft Teams.

Depois entra o roteiro de Dados baseado no roteiro RFB do TI Total:
TI01 I/II → TI03/04/05 → TI07 → TI08 → TI08-II → TI21-II → TI37-I → TI37-II → TI38 → TI39 → TI43 → TI60 → TI61 → TI62 → TI63.

Adiados, mas preservados:
- Windows 10
- Linux
- LibreOffice

## Isolamento de dados
- LocalStorage: `metodo-et:camile:v1`
- Drive: `Metodo ET - Camile - Dados.json`
- Metas, sessões, questões, checkpoints, conquistas e histórico começam zerados.
- AFO, DAD e TI permanecem cadastrados para expansão futura, fora do ciclo atual.

## Teste local
Sirva a pasta `metodo-et` por HTTP local. Exemplo no macOS:
```bash
cd metodo-et
python3 -m http.server 8000
```
Depois abra `http://localhost:8000`.

Não teste abrindo o `index.html` diretamente por `file://`, porque a app usa módulos JavaScript e carrega a base JSON por fetch.

## Identidade
Paleta rosa, roxo e lilás; girassol como símbolo principal; capivara ilustrada como elemento afetivo/decorativo.

## Publicação
A branch `estudos-camile` é a área segura de teste. Quando o repositório independente `estudos-camile` existir, o conteúdo deve ser transferido integralmente e só então preparado para publicação mobile/iPhone.
