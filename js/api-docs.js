/**
 * ================================================================
 *  API DE COLABORADORES — Firestore REST API (100% gratuita)
 * ================================================================
 *
 * O Firebase Firestore possui uma REST API nativa e gratuita.
 * Sistemas externos podem enviar colaboradores diretamente para
 * o Firestore sem precisar de Firebase Functions (que é pago).
 *
 * BASE URL:
 *   https://firestore.googleapis.com/v1/projects/gestao-premios-indicacao/databases/(default)/documents
 *
 * AUTENTICAÇÃO:
 *   Usar uma Service Account Key (JSON) para gerar um token OAuth2,
 *   ou simplificar usando a Web API Key do Firebase com autenticação anônima.
 *
 * ================================================================
 *  OPÇÃO RECOMENDADA: Autenticação via API Key + Regras abertas
 * ================================================================
 *
 * Como funciona:
 * 1. O sistema externo faz login anônimo no Firebase para obter um idToken
 * 2. Usa esse idToken para escrever diretamente no Firestore via REST
 * 3. As regras do Firestore permitem escrita para usuários autenticados
 *
 * ================================================================
 *  EXEMPLO DE INTEGRAÇÃO (qualquer linguagem)
 * ================================================================
 *
 * PASSO 1 — Obter token de acesso (válido por 1 hora):
 *
 *   POST https://identitytoolkit.googleapis.com/v1/accounts:signInAnonymously?key=AIzaSyD7E3w1x9ezsU_59brfx75mJ6V2xwDpID4
 *   Body: {}
 *   Resposta: { "idToken": "eyJ..." }
 *
 * PASSO 2 — Criar/Atualizar colaborador (PATCH = upsert por documento):
 *
 *   PATCH https://firestore.googleapis.com/v1/projects/gestao-premios-indicacao/databases/(default)/documents/colaboradores/MAT_00123?updateMask.fieldPaths=matricula&updateMask.fieldPaths=nome&updateMask.fieldPaths=setor&updateMask.fieldPaths=dataAdmissao&updateMask.fieldPaths=tipoContrato&updateMask.fieldPaths=status&updateMask.fieldPaths=fonte
 *   Headers: Authorization: Bearer {idToken}
 *   Body:
 *   {
 *     "fields": {
 *       "matricula":    { "stringValue": "00123" },
 *       "nome":         { "stringValue": "João Silva" },
 *       "setor":        { "stringValue": "Produção" },
 *       "dataAdmissao": { "stringValue": "2024-03-01" },
 *       "tipoContrato": { "stringValue": "experiencia" },
 *       "status":       { "stringValue": "ativo" },
 *       "foiIndicado":  { "booleanValue": false },
 *       "fonte":        { "stringValue": "api" }
 *     }
 *   }
 *
 * IMPORTANTE: Use a matrícula como ID do documento (ex: MAT_00123)
 * para garantir que a mesma matrícula não seja duplicada.
 *
 * ================================================================
 *  EXEMPLO EM PYTHON
 * ================================================================
 *
 * import requests, json
 *
 * API_KEY = "AIzaSyD7E3w1x9ezsU_59brfx75mJ6V2xwDpID4"
 * PROJECT = "gestao-premios-indicacao"
 * BASE    = f"https://firestore.googleapis.com/v1/projects/{PROJECT}/databases/(default)/documents"
 *
 * def get_token():
 *     r = requests.post(
 *         f"https://identitytoolkit.googleapis.com/v1/accounts:signInAnonymously?key={API_KEY}",
 *         json={}
 *     )
 *     return r.json()["idToken"]
 *
 * def upsert_colaborador(token, dados):
 *     mat = dados["matricula"]
 *     url = f"{BASE}/colaboradores/MAT_{mat}"
 *     fields = {k: {"stringValue": str(v)} for k, v in dados.items()}
 *     fields["foiIndicado"] = {"booleanValue": False}
 *     fields["status"]      = {"stringValue": "ativo"}
 *     fields["fonte"]       = {"stringValue": "api"}
 *     r = requests.patch(url, json={"fields": fields},
 *                        headers={"Authorization": f"Bearer {token}"})
 *     return r.json()
 *
 * token = get_token()
 * upsert_colaborador(token, {
 *     "matricula": "00123",
 *     "nome": "João Silva",
 *     "setor": "Produção",
 *     "dataAdmissao": "2024-03-01",
 *     "tipoContrato": "experiencia"
 * })
 *
 * ================================================================
 *  EXEMPLO EM NODE.JS / JAVASCRIPT
 * ================================================================
 *
 * const API_KEY = "AIzaSyD7E3w1x9ezsU_59brfx75mJ6V2xwDpID4";
 * const PROJECT = "gestao-premios-indicacao";
 * const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
 *
 * async function getToken() {
 *   const r = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInAnonymously?key=${API_KEY}`, {
 *     method: 'POST', body: '{}', headers: { 'Content-Type': 'application/json' }
 *   });
 *   return (await r.json()).idToken;
 * }
 *
 * async function upsertColaborador(token, dados) {
 *   const url = `${BASE}/colaboradores/MAT_${dados.matricula}`;
 *   const fields = {};
 *   Object.entries(dados).forEach(([k, v]) => fields[k] = { stringValue: String(v) });
 *   fields.foiIndicado = { booleanValue: false };
 *   fields.status = { stringValue: 'ativo' };
 *   fields.fonte = { stringValue: 'api' };
 *   return fetch(url, {
 *     method: 'PATCH',
 *     body: JSON.stringify({ fields }),
 *     headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
 *   });
 * }
 *
 */

// Este arquivo é apenas documentação — não precisa ser importado.
export const API_DOCS = {
  projectId: 'gestao-premios-indicacao',
  apiKey: 'AIzaSyD7E3w1x9ezsU_59brfx75mJ6V2xwDpID4',
  baseUrl: 'https://firestore.googleapis.com/v1/projects/gestao-premios-indicacao/databases/(default)/documents',
  authUrl: 'https://identitytoolkit.googleapis.com/v1/accounts:signInAnonymously?key=AIzaSyD7E3w1x9ezsU_59brfx75mJ6V2xwDpID4',
  colecao: 'colaboradores',
  idFormato: 'MAT_{matricula}',
};
