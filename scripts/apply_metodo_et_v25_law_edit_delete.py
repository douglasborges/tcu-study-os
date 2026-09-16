from pathlib import Path

root = Path('metodo-et')
app_path = root / 'src/app.js'
index_path = root / 'index.html'

app = app_path.read_text(encoding='utf-8')
index = index_path.read_text(encoding='utf-8')

# 1) Histórico: adicionar coluna de ações com Editar / Excluir.
old_head = '<th>ANOTAÇÃO</th></tr></thead><tbody>${rows.map(x=>`<tr><td>${esc(x.date)}</td><td>${esc(l.queue.find(n=>n.id===x.normId)?.short||x.normId)}</td><td>${x.minutes} min</td><td>${esc([x.startRef,x.endRef].filter(Boolean).join(\' → \')||\'—\')}</td><td>${esc(x.notes||\'—\')}</td></tr>`).join(\'\')}</tbody></table></div>`'
new_head = '<th>ANOTAÇÃO</th><th>AÇÕES</th></tr></thead><tbody>${rows.map(x=>`<tr><td>${esc(x.date)}</td><td>${esc(l.queue.find(n=>n.id===x.normId)?.short||x.normId)}</td><td>${x.minutes} min</td><td>${esc([x.startRef,x.endRef].filter(Boolean).join(\' → \')||\'—\')}</td><td>${esc(x.notes||\'—\')}</td><td><div class="actions"><button class="secondary small" data-action="law-edit" data-id="${esc(x.id)}">Editar</button><button class="secondary small" data-action="law-delete" data-id="${esc(x.id)}">Excluir</button></div></td></tr>`).join(\'\')}</tbody></table></div>`'
if old_head not in app:
    raise SystemExit('Trecho do histórico de legislação não encontrado.')
app = app.replace(old_head, new_head, 1)

# 2) Diálogos de edição e exclusão.
anchor = "function completeLawDialog(){"
feature = r'''function lawRecord(id){return lawState().sessions.find(x=>x.id===id);}
function editLawDialog(id){let rec=lawRecord(id);if(!rec)throw Error('Registro de legislação não encontrado.');let norm=lawState().queue.find(n=>n.id===rec.normId);open(`<h2>Editar leitura de Legislação Seca</h2><p class="muted"><b>${esc(norm?.short||rec.normId)}</b> · ${esc(norm?.title||'')}</p><form id="law-edit-form" class="form-grid"><label>Data<input required type="date" name="date" value="${esc(rec.date)}" max="${M.day()}"></label><label>Minutos<input required type="number" min="1" max="1440" step="1" name="minutes" value="${rec.minutes}"></label><label>Ponto inicial<input name="startRef" maxlength="120" value="${esc(rec.startRef||'')}" placeholder="Ex.: art. 1º"></label><label>Ponto final<input name="endRef" maxlength="120" value="${esc(rec.endRef||'')}" placeholder="Ex.: art. 12"></label><label class="full">Anotação opcional<textarea name="notes" maxlength="2000">${esc(rec.notes||'')}</textarea></label><button class="full">Salvar alterações</button></form>`);$('#law-edit-form').onsubmit=e=>{e.preventDefault();let d=Object.fromEntries(new FormData(e.target)),minutes=Number(d.minutes);if(!M.validDay(d.date)||d.date>M.day()||!Number.isInteger(minutes)||minutes<1||minutes>1440){toast('Confira a data e o tempo da leitura.',true);return;}if(change(()=>{let next=M.copy(state),x=next.legislation.sessions.find(x=>x.id===id);if(!x)throw Error('Registro de legislação não encontrado.');Object.assign(x,{date:d.date,minutes,startRef:String(d.startRef||'').trim(),endRef:String(d.endRef||'').trim(),notes:String(d.notes||'').trim(),updatedAt:new Date().toISOString()});return next;},'Leitura de legislação atualizada.'))close();};}
function deleteLawDialog(id){let rec=lawRecord(id);if(!rec)throw Error('Registro de legislação não encontrado.');let norm=lawState().queue.find(n=>n.id===rec.normId);open(`<h2>Excluir leitura?</h2><div class="warning">Esta ação removerá o registro de <b>${esc(norm?.short||rec.normId)}</b> de ${esc(rec.date)}, com ${rec.minutes} min. Os demais estudos não serão alterados.</div><form id="law-delete-form"><button>Confirmar exclusão</button></form>`);$('#law-delete-form').onsubmit=e=>{e.preventDefault();if(change(()=>{let next=M.copy(state),before=next.legislation.sessions.length;next.legislation.sessions=next.legislation.sessions.filter(x=>x.id!==id);if(next.legislation.sessions.length===before)throw Error('Registro de legislação não encontrado.');return next;},'Leitura de legislação excluída.'))close();};}
'''
if 'function editLawDialog(' not in app:
    if anchor not in app:
        raise SystemExit('Âncora completeLawDialog não encontrada.')
    app = app.replace(anchor, feature + anchor, 1)

# 3) Ações dos botões no manipulador global.
action_anchor = "if(a==='law-manual')lawManualDialog();"
actions = "if(a==='law-edit')editLawDialog(id);if(a==='law-delete')deleteLawDialog(id);"
if actions not in app:
    if action_anchor not in app:
        raise SystemExit('Âncora law-manual não encontrada.')
    app = app.replace(action_anchor, actions + action_anchor, 1)

# 4) Cache-bust da aplicação.
app = app.replace("./core.js?v=2.4", "./core.js?v=2.5", 1)
app_path.write_text(app, encoding='utf-8')

index = index.replace('?v=2.4', '?v=2.5')
index = index.replace('content="2.4-legislacao-seca"', 'content="2.5-law-edit-delete"')
index_path.write_text(index, encoding='utf-8')

# 5) Asserções de segurança.
app = app_path.read_text(encoding='utf-8')
index = index_path.read_text(encoding='utf-8')
assert 'function editLawDialog(' in app
assert 'function deleteLawDialog(' in app
assert 'data-action="law-edit"' in app
assert 'data-action="law-delete"' in app
assert "if(a==='law-edit')editLawDialog(id);" in app
assert "if(a==='law-delete')deleteLawDialog(id);" in app
assert './core.js?v=2.5' in app
assert '2.5-law-edit-delete' in index
assert '?v=2.5' in index
assert 'MutationObserver' not in (root / 'drive-sync.js').read_text(encoding='utf-8')
assert 'main.focus()' not in app
