/* Missão Clique: apresentação local, sem bibliotecas ou serviços externos. */
'use strict';
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const icon = (name, cls = '') => {
  const paths = {
    arrow:'<path d="m9 5 7 7-7 7M4 12h12"/>',
    mouse:'<rect x="6" y="2" width="12" height="20" rx="6"/><path d="M12 2v7M6 9h12"/>',
    folder:'<path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    file:'<path d="M6 2h8l5 5v15H6zM14 2v6h5M9 13h7M9 17h7"/>',
    screen:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 22h8M12 17v5"/>',
    keyboard:'<rect x="1" y="5" width="22" height="14" rx="2"/><path d="M5 9h1m3 0h1m3 0h1m3 0h1M5 13h1m3 0h1m3 0h1m3 0h1M6 16h12"/>',
    flag:'<path d="M4 22V3m0 1c5-5 10 5 16 0v10c-6 5-11-5-16 0"/>',
    check:'<path d="m5 12 4 4L20 5"/>',
    power:'<path d="M12 2v10M6 5a9 9 0 1 0 12 0"/>',
    trophy:'<path d="M7 3h10v7a5 5 0 0 1-10 0zM7 5H3v3a4 4 0 0 0 4 4m10-7h4v3a4 4 0 0 1-4 4M12 15v5M7 22h10"/>',
    bulb:'<path d="M8 17c0-4-3-4-3-8a7 7 0 0 1 14 0c0 4-3 4-3 8zM8 20h8M10 23h4"/>',
    trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 16h12l1-16M10 10v8m4-8v8"/>',
    window:'<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20M5 5.5h.1M8 5.5h.1"/>',
    book:'<path d="M12 5v17M12 5C8 2 4 2 2 3v17c3-1 7-1 10 2 3-3 7-3 10-2V3c-3-1-7-1-10 2"/>',
    map:'<path d="m2 5 7-3 6 3 7-3v17l-7 3-6-3-7 3zM9 2v17m6-14v17"/>',
    expand:'<path d="M8 2H2v6m14-6h6v6M2 16v6h6m14-6v6h-6"/>',
    save:'<path d="M4 2h14l3 3v17H3V2zM7 2v7h10V2M7 22v-9h10v9"/>',
    help:'<circle cx="12" cy="12" r="10"/><path d="M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 4h.1"/>'
  };
  return `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.flag}</svg>`;
};
const key = k => `<kbd>${k}</kbd>`;
const combo = (...ks) => `<span class="combo">${ks.map(key).join('<span class="plus">+</span>')}</span>`;
const sequence = (a,b) => `<span class="sequence">${key(a)}<span>depois</span>${key(b)}</span>`;
const step = (n, title, text) => `<div class="step"><span class="step-num">${n}</span><div><h3>${title}</h3><p>${text}</p></div></div>`;
const tip = text => `<div class="tip">${icon('bulb')}<span>${text}</span></div>`;
const mission = (number, title, body) => `<div class="mission-head"><span class="mission-no">${number}</span><div><span class="eyebrow">SUA VEZ NO COMPUTADOR</span><h2>${title}</h2></div></div>${body}`;
const phaseNames = ['Entrada no mundo', 'Aprenda os controles', 'Explore a tela', 'Organize o inventário', 'Conquista final'];
const slides = [
  { id:'inicio', phase:0, label:'Boas-vindas', type:'cover', title:'Seu primeiro<br>mundo <em>digital.</em>', content:`
    <div class="cover-copy"><div class="eyebrow red">INFORMÁTICA · 7º ANO</div><h1 class="sr-only">Missão Clique: seu primeiro mundo digital</h1><img class="cover-logo" src="assets/logo-missao-clique.webp" alt="Missão Clique. Seu primeiro mundo digital." width="1536" height="1024"><p class="lead">Uma aventura de cliques, descobertas<br>e pequenas conquistas.</p><button class="primary big" data-next>Entrar no mundo ${icon('arrow')}</button><div class="cover-caption">INSPIRADO NO UNIVERSO ROBLOX</div></div>
    <div class="cover-stamp"><span class="tiny">SEU OBJETIVO</span><strong>Ganhar confiança.</strong><span>Um passo de cada vez.</span></div>`,
    notes:'Receba a turma. Pergunte quem já usou um computador e quem costuma jogar no celular. Explique que a aula usa o universo visual de Roblox, mas as missões acontecem no computador, sem precisar acessar o jogo. Não pressuponha experiência com Roblox.' },
  { id:'mapa', phase:0, label:'Mapa da aventura', title:'Três fases. Muitas descobertas.', subtitle:'Observe a demonstração, experimente e conte como conseguiu.', content:`
    <div class="world-map">${[
      [1,'mouse','Aprenda os<br>controles','Notebook, mouse e teclado.','40 MIN',3],
      [2,'window','Explore<br>a tela','Programas, ícones e janelas.','30 MIN',13],
      [3,'folder','Organize seu<br>inventário','Crie, salve e encontre arquivos.','40 MIN',20]
    ].map(([n,i,t,d,time,target])=>`<button class="world" data-goto="${target}"><span class="world-index">0${n}</span><span class="world-object">${icon(i)}</span><h3>${t}</h3><p>${d}</p><span class="world-time">${time} ${icon('arrow')}</span></button>`).join('')}</div>
    <div class="under-map"><span>+ 10 minutos para dúvidas e ajustes</span><strong>O importante é aprender. Cada pessoa tem seu ritmo.</strong></div>`,
    notes:'Esta tela também é um menu: clique em uma fase para ir até ela. A distribuição original é 40 + 30 + 40 minutos, com 10 minutos livres. Use os checkpoints como pausas de avaliação, sem pontuação por velocidade.' },
  { id:'combinados', phase:0, label:'Combinados', title:'Um bom time cuida de todos', subtitle:'Nosso combinado para explorar com tranquilidade.', content:`
    <div class="rules"><div class="rule">${icon('mouse')}<span>01</span><h3>Cuide do equipamento</h3><p>Mãos secas e líquidos longe do notebook.</p></div><div class="rule">${icon('help')}<span>02</span><h3>Peça uma ajuda</h3><p>Algo travou? Chame o instrutor antes de mexer em cabos ou configurações.</p></div><div class="rule">${icon('book')}<span>03</span><h3>Ajude sem fazer pelo colega</h3><p>Explique o caminho e deixe a outra pessoa experimentar.</p></div></div>
    ${tip('Errar faz parte do treino. Você pode tentar de novo e consultar o roteiro ilustrado.')}`,
    notes:'Combine um sinal para pedir ajuda. Mostre onde está o roteiro ilustrado. Evite que quem já tem familiaridade assuma o mouse dos colegas. Nunca solicite senhas ou informações pessoais.' },
  { id:'fase-1', phase:1, label:'Fase 1', type:'divider', title:'Aprenda os controles', content:`
    <div class="divider-number">01</div><div class="divider-copy"><span class="eyebrow red">FASE 1 · 40 MINUTOS</span><h1>Aprenda<br>os <em>controles.</em></h1><p class="lead">Antes de explorar um mundo,<br>você conhece os comandos.</p><div class="divider-goal">${icon('flag')} Sua conquista: escrever sua primeira apresentação.</div><button class="primary" data-next>Começar a fase ${icon('arrow')}</button></div><div class="divider-art">${icon('keyboard')}</div>`,
    notes:'Referência de tempo da fase: partes e energia 8 min; mouse/touchpad 10 min; teclado e edição 12 min; missão e checkpoint 10 min. Reorganize conforme as necessidades da turma.' },
  { id:'notebook', phase:1, label:'Partes do notebook', title:'Conheça seu equipamento', subtitle:'Cada parte tem uma função. Aponte no seu notebook enquanto descobre.', content:`
    <div class="hardware-layout"><div class="hardware-list">${step(1,'Tela','Mostra textos, imagens e programas.')}${step(2,'Teclado','Escreve letras, números e símbolos.')}${step(3,'Touchpad','Move o ponteiro sem um mouse.')}</div>
    <div class="laptop" aria-label="Diagrama simplificado de um notebook"><div class="laptop-screen"><div class="screen-wallpaper"><span class="pixel-logo"></span></div><b class="pin p1">1</b><b class="pin p4">4</b></div><div class="laptop-base"><div class="keyboard-lines"></div><div class="touchpad"></div><b class="pin p2">2</b><b class="pin p3">3</b><b class="pin p5">5</b><b class="pin p6">6</b></div></div>
    <div class="hardware-list">${step(4,'Webcam','Câmera para fotos e chamadas de vídeo.')}${step(5,'Alto-falantes','Reproduzem o som do computador.')}${step(6,'Botão de ligar','Inicia o notebook.')}</div></div><p class="small center">Desenho simplificado. A posição das peças pode variar no seu notebook.</p>`,
    notes:'Mostre um notebook real junto do diagrama. Peça que localizem tela, teclado e touchpad antes de apresentar os demais itens. Confira a posição real do botão de ligar. Não incentive a apertá-lo durante a identificação.' },
  { id:'energia', phase:1, label:'Ligar e desligar', title:'Entrada e saída do mundo', subtitle:'O computador também tem um jeito certo de começar e encerrar.', content:`
    <div class="energy-grid"><div class="energy-main"><div class="huge-icon">${icon('power')}</div><h3>Para ligar</h3><ol class="clean-list"><li>Abra o notebook.</li><li>Aperte o botão de ligar uma vez.</li><li>Espere o sistema iniciar.</li></ol></div><div class="energy-main"><div class="huge-icon muted">${icon('screen')}</div><h3>Para desligar</h3><ol class="clean-list"><li>Salve o que estiver fazendo.</li><li>Abra <strong>Iniciar</strong> e escolha <strong>Energia</strong>.</li><li>Clique em <strong>Desligar</strong> e espere.</li></ol></div><aside class="energy-aside"><span class="moon">☾</span><h3>Pausa curta?</h3><p>A opção <strong>Suspender</strong> mantém seus programas abertos e usa pouca energia.</p><p class="small">Confirme com o instrutor quando usar.</p></aside></div>
    ${tip('Desligue pelo menu. Para encerrar, não puxe o carregador nem segure o botão de ligar sem orientação.')}`,
    notes:'Demonstre o menu da versão de Windows dos equipamentos. Nesta etapa, explique o desligamento sem pedir que todos desliguem. A turma poderá executar o procedimento no encerramento, depois de salvar o trabalho.' },
  { id:'mouse', phase:1, label:'Mouse e touchpad', title:'O ponteiro é sua mão na tela', subtitle:'Mouse e touchpad controlam a mesma setinha.', content:`
    <div class="controls-layout"><div>${step(1,'Clique','Um toque no botão esquerdo seleciona itens ou aciona botões.')}${step(2,'Duplo clique','Dois cliques rápidos abrem muitos arquivos e pastas.')}${step(3,'Arrastar','Segure o botão esquerdo, mova e solte para colocar no lugar.')}</div><div class="touchpad-demo"><div class="trackpad"><span class="finger"></span><span class="track-arrows">↔</span><div class="track-buttons"><span></span><span></span></div></div><h3>No touchpad</h3><p>Deslize um dedo para mover o ponteiro.<br>Um toque costuma clicar. Dois toques rápidos costumam abrir.</p><p class="small">Os gestos dependem da configuração do notebook.</p></div></div>`,
    notes:'Mostre primeiro mover e clicar. Se dois toques no touchpad não abrirem, mostre o botão físico correspondente. Para arrastar com touchpad, segure o botão esquerdo e deslize outro dedo. Dê tempo para coordenação motora.' },
  { id:'treino-clique', phase:1, label:'Treino de clique', title:'Um checkpoint por clique', subtitle:'Treino aqui na apresentação: encontre as três bandeiras.', content:`
    <div class="click-training"><div class="training-info"><span class="eyebrow red">SEM CORRIDA</span><h3>Leve a setinha<br>até a bandeira.</h3><p>Clique uma vez com o botão esquerdo. Depois procure a próxima.</p><div class="counter"><strong id="clickCount">0</strong><span>de 3 checkpoints</span></div><button class="text-button" data-action="restart-click">Recomeçar treino</button></div><div class="click-arena" id="clickArena"><div class="arena-grid"></div><button class="flag-target" id="flagTarget" aria-label="Checkpoint 1: clique na bandeira">${icon('flag')}</button><div class="arena-status" id="arenaStatus" aria-live="polite">Encontre a primeira bandeira.</div></div></div>`,
    notes:'Convide um aluno para experimentar ou faça o movimento lentamente. Quem acompanha individualmente pode treinar no próprio navegador. Este treino não mede velocidade. Para praticar duplo clique e arrastar, use os arquivos de treino do equipamento ou a atividade do inventário mais adiante.' },
  { id:'teclado', phase:1, label:'Teclas principais', title:'Seu teclado, seus comandos', subtitle:'Agora os comandos servem para criar uma mensagem.', content:`
    <div class="keys-grid">${[
      ['A B C','Letras e números','Escrevem seu texto.'],['Espaço','Espaço','Separa as palavras.'],['Enter','Enter','Pula uma linha ou confirma uma ação.'],['Shift','Shift','Com uma letra, faz maiúscula. Com outra tecla, escolhe o símbolo de cima.'],['← ↑ ↓ →','Setas','Movem o cursor pelo texto.'],['Tab','Tab','Avança entre campos e opções.']
    ].map(([k,t,d])=>`<div class="key-lesson">${key(k)}<h3>${t}</h3><p>${d}</p></div>`).join('')}</div>
    ${tip('Cursor é a barrinha que pisca no lugar onde você vai digitar. Ponteiro é a setinha que você move com o mouse.')}`,
    notes:'Aponte as teclas no teclado físico, preferencialmente ABNT2. No texto, Tab pode inserir tabulação. Em formulários e opções, ele muda o foco. A tecla Enter pode ter funções diferentes conforme o programa.' },
  { id:'editar', phase:1, label:'Escrita e edição', title:'Escrever também é experimentar', subtitle:'Clique no campo e escreva. Este texto é só um treino dentro da apresentação.', content:`
    <div class="editor-layout"><div class="training-editor"><div class="fake-title">${icon('file')} Meu treino de digitação <span>ÁREA DE TREINO</span></div><label class="sr-only" for="typingPractice">Escreva sua mensagem de treino</label><textarea id="typingPractice" spellcheck="true" placeholder="Olá! Meu nome é..." aria-describedby="typingHint"></textarea><div class="editor-status" id="typingHint">Experimente uma maiúscula, um acento e uma nova linha.</div></div><div class="edit-explainer"><div>${key('Backspace')}<h3>Apaga à esquerda</h3><p>A letra que está antes do cursor.</p></div><div>${key('Delete')}<h3>Apaga à direita</h3><p>A letra depois do cursor ou o texto selecionado.</p></div><p class="small">Seu texto aqui não cria um arquivo no computador.</p></div></div>`,
    notes:'Clique no campo, digite Olá mundo, posicione o cursor entre as palavras e demonstre Backspace e Delete. Mostre que um trecho selecionado também pode ser apagado. O campo é um treino no navegador. O texto do exercício de verdade será salvo no Bloco de Notas na fase 3.' },
  { id:'acentos', phase:1, label:'Acentos e símbolos', title:'O toque especial do seu texto', subtitle:'No teclado brasileiro ABNT2, o acento costuma vir antes da letra.', content:`
    <div class="accent-layout"><div class="accent-examples"><div>${sequence('´','a')}<strong>á</strong></div><div>${sequence('~','a')}<strong>ã</strong></div><div>${sequence('^','e')}<strong>ê</strong></div><p>Aperte o acento, solte e depois aperte a letra.<br>Uma tecla de cada vez.</p></div><div class="symbol-examples"><h3>Maiúsculas e símbolos</h3><div>${combo('Shift','a')}<strong>A</strong></div><div>${combo('Shift','1')}<strong>!</strong></div><div>${key('Ç')}<span>A cedilha tem uma tecla própria.</span></div></div></div>
    ${tip('Veja os símbolos do seu teclado. Se o acento estiver na parte de cima da tecla, use Shift para escolhê-lo.')}`,
    notes:'Nos exemplos de acento as teclas são sequenciais, não simultâneas. Destaque isso explicitamente para não confundir com atalhos. Shift + letra ou número são simultâneos. A posição dos símbolos e o comportamento dos acentos dependem do layout configurado. Se necessário, ajuste a explicação ao equipamento.' },
  { id:'atalhos', phase:1, label:'Atalhos úteis', title:'Pequenos atalhos, grandes ajudas', subtitle:'Em um atalho, segure a primeira tecla e aperte a segunda.', content:`
    <div class="shortcut-layout"><div class="shortcut-main"><div>${combo('Ctrl','C')}<h3>Copiar</h3><p>Cria uma cópia do que você selecionou.</p></div><div>${combo('Ctrl','V')}<h3>Colar</h3><p>Coloca o que você copiou no lugar escolhido.</p></div><div>${combo('Ctrl','Z')}<h3>Desfazer</h3><p>Volta uma ação, quando o programa permite.</p></div></div><div class="shortcut-extra"><span>PARA CONSULTAR DEPOIS</span><p>${combo('Ctrl','X')} Recortar</p><p>${combo('Ctrl','S')} Salvar*</p><p>${combo('Ctrl','A')} Selecionar tudo*</p><p>${combo('Ctrl','F')} Buscar*</p><small>*Alguns programas ou idiomas usam outros atalhos. Confira o menu.</small></div></div>`,
    notes:'Priorize copiar, colar e desfazer. No campo da tela anterior, selecione um trecho e demonstre. Ctrl + S e Ctrl + A podem variar em versões localizadas de programas. No navegador, Ctrl + S salva a página, não o arquivo do Bloco de Notas. Para ensinar salvamento, use o menu do programa real.' },
  { id:'missao-1', phase:1, label:'Missão 1', type:'mission', title:'Seu cartão de jogador', content:mission('01','Seu cartão de jogador',`
    <div class="mission-layout"><div class="mission-steps">${step(1,'Abra o Bloco de Notas','Com a ajuda do instrutor, encontre e abra o programa.')}${step(2,'Escreva sua apresentação','Digite seu nome, algo de que você gosta e algo que quer aprender.')}${step(3,'Experimente os controles','Use uma maiúscula, um acento e uma nova linha. Corrija uma palavra.')}</div><div class="sample-note"><span>EXEMPLO</span><p>Olá! Meu nome é Alex.<br>Gosto de construir mundos.<br>Quero aprender a salvar<br>meus arquivos.</p><div class="sample-cursor"></div></div></div>
    <div class="mission-footer"><span>${icon('bulb')} Deixe o texto aberto. Vamos guardá-lo na fase 3.</span><button class="primary" data-award="1">Concluí a missão ${icon('check')}</button></div>`),
    notes:'Confirme se os equipamentos já estão ligados. Dê apoio para abrir o Bloco de Notas pelo menu Iniciar. Use apenas primeiro nome ou apelido. O aluno não precisa copiar o exemplo. Não feche o texto: ele será usado na fase 3. O botão marca a conquista da turma, não avalia automaticamente o trabalho.' },
  { id:'fase-2', phase:2, label:'Fase 2', type:'divider', title:'Explore a tela', content:`
    <div class="divider-number">02</div><div class="divider-copy"><span class="eyebrow red">FASE 2 · 30 MINUTOS</span><h1>Explore<br>a <em>tela.</em></h1><p class="lead">Um mundo de programas.<br>Você escolhe por onde começar.</p><div class="divider-goal">${icon('flag')} Sua conquista: abrir programas e trocar de janela.</div><button class="primary" data-next>Explorar a fase ${icon('arrow')}</button></div><div class="divider-art">${icon('window')}</div>`,
    notes:'Referência de tempo: área de trabalho e ícones 8 min; menu Iniciar e controles de janela 8 min; alternar programas 6 min; missão e checkpoint 8 min. Preserve o texto da fase 1 aberto.' },
  { id:'area-trabalho', phase:2, label:'Área de trabalho', title:'Seu ponto de partida', subtitle:'A área de trabalho reúne ícones e dá acesso a programas e janelas.', content:`
    <div class="desktop-layout"><div class="desktop-demo"><div class="desktop-icons"><div>${icon('trash')}<span>Lixeira</span></div><div>${icon('folder')}<span>Pasta de treino</span></div><div>${icon('file')}<span>Meu texto</span></div></div><div class="desktop-center"><span class="pixel-logo"></span><p>ÁREA DE TRABALHO</p></div><div class="taskbar"><span class="start-symbol">⊞</span><span class="search-symbol">⌕</span>${icon('folder')}${icon('window')}<span class="taskbar-time">10:25<br>SEGUNDA-FEIRA</span></div><b class="desktop-callout dc1">ÍCONES</b><b class="desktop-callout dc2">BARRA DE TAREFAS</b></div><aside><h3>Como uma base de exploração</h3><p>Daqui você encontra caminhos para suas atividades.</p><p><strong>Ícones</strong> representam arquivos, pastas e programas.</p><p>A <strong>barra de tarefas</strong> ajuda a acessar e alternar aplicativos.</p></aside></div><p class="small">Representação simplificada do Windows. O visual do seu computador pode ser diferente.</p>`,
    notes:'Minimize a apresentação por um momento e mostre a área de trabalho real. Peça que localizem a barra de tarefas e a Lixeira. A metáfora da base indica acesso e orientação. Não implica que todos os programas ou arquivos estejam na área de trabalho.' },
  { id:'icones', phase:2, label:'Ícones', title:'Um desenho que representa algo', subtitle:'Olhe o símbolo e leia o nome antes de abrir.', content:`
    <div class="inventory-icons"><div class="inventory-item yellow">${icon('folder')}<h3>Pasta</h3><p>Organiza arquivos.</p></div><div class="inventory-item pale">${icon('file')}<h3>Arquivo</h3><p>Guarda um conteúdo.</p></div><div class="inventory-item red-item">${icon('window')}<h3>Programa</h3><p>Ajuda você a fazer uma tarefa.</p></div></div>
    <div class="comparison"><span>NO NOSSO MAPA</span><p>O ícone é uma pista visual. O nome ajuda a saber o que você está escolhendo.</p></div>`,
    notes:'Mostre exemplos reais: uma pasta em Documentos, um arquivo de texto e o Bloco de Notas. Não afirme que a aparência do ícone garante o tipo do arquivo. Enfatize a leitura do nome e o contexto.' },
  { id:'iniciar', phase:2, label:'Menu Iniciar', title:'Um caminho para os programas', subtitle:'O menu Iniciar ajuda a encontrar o que você quer abrir.', content:`
    <div class="start-layout"><div class="start-menu"><div class="start-search">⌕ <span>Digite o nome de um programa</span></div><span class="tiny">EXEMPLOS DE PROGRAMAS</span><div class="start-apps"><div>${icon('file')}<span>Bloco de Notas</span></div><div>${icon('keyboard')}<span>Calculadora</span></div><div>${icon('folder')}<span>Explorador de Arquivos</span></div><div>${icon('window')}<span>Navegador</span></div></div><div class="start-bottom"><span>Seu computador</span>${icon('power')}</div></div><div>${step(1,'Abra Iniciar','Clique no símbolo do Windows na barra de tarefas.')}${step(2,'Procure o programa','Digite, por exemplo, Calculadora.')}${step(3,'Confira e abra','Leia o resultado e clique no programa desejado.')}</div></div>`,
    notes:'Demonstre no menu Iniciar real. A posição e o desenho podem variar por versão. O menu mostrado é apenas explicativo. Use Calculadora como segundo programa para a turma não precisar acessar a internet.' },
  { id:'janelas', phase:2, label:'Controles de janela', title:'Cada janela tem seus controles', subtitle:'Experimente os botões do desenho e observe o resultado.', content:`
    <div class="window-training"><div class="window-stage" id="windowStage"><div class="practice-window" id="practiceWindow"><div class="practice-title"><span>${icon('file')} Janela de treino</span><div><button data-window="min" aria-label="Minimizar janela de treino">−</button><button data-window="max" aria-label="Maximizar ou restaurar janela de treino">□</button><button data-window="close" class="close-window" aria-label="Fechar janela de treino">×</button></div></div><div class="practice-content"><span class="pixel-logo"></span><h3>Seu programa continua aqui.</h3><p>Teste os controles na parte de cima.</p></div></div><button class="restore-window" id="restoreWindow" hidden data-window="restore">${icon('window')} <span>Reabrir a janela de treino</span></button><div class="window-message" id="windowMessage" aria-live="polite"></div></div><aside>${step('−','Minimizar','Esconde a janela. O programa continua aberto.')}${step('□','Maximizar / restaurar','Aumenta a janela ou volta ao tamanho anterior.')}${step('×','Fechar','Encerra a janela. Confira se precisa salvar seu trabalho.')}</aside></div>`,
    notes:'Este é um desenho interativo, não uma janela real do sistema. Após o treino, demonstre os controles na Calculadora. Fechar pode encerrar apenas uma janela de um programa com várias janelas. Se houver trabalho não salvo, explique a solicitação de salvamento.' },
  { id:'alternar', phase:2, label:'Alternar janelas', title:'Duas janelas, duas tarefas', subtitle:'Você pode trocar de programa sem fechar o que está fazendo.', content:`
    <div class="alt-layout"><div class="giant-combo">${combo('Alt','Tab')}</div><div><h3>Segure Alt.<br>Aperte Tab.<br>Solte para escolher.</h3><p>Ou clique no programa desejado na barra de tarefas.</p><div class="alt-preview"><span>${icon('file')} Seu texto</span><span>${icon('keyboard')} Calculadora</span></div></div></div>
    ${tip('Faça esse teste no computador. Alt + Tab troca de janela do sistema e pode sair desta apresentação.')}`,
    notes:'Abra Bloco de Notas e Calculadora. Demonstre Alt + Tab lentamente. Peça que alternem e retornem ao texto. O navegador não deve tentar capturar esse atalho do sistema. Reforce a alternativa de clicar na barra de tarefas.' },
  { id:'missao-2', phase:2, label:'Missão 2', type:'mission', title:'Explorador de janelas', content:mission('02','Explorador de janelas',`
    <div class="mission-layout"><div class="mission-steps">${step(1,'Encontre a Calculadora','Abra pelo menu Iniciar. Mantenha seu texto no Bloco de Notas aberto.')}${step(2,'Troque de janela','Use Alt + Tab para ir à Calculadora e voltar ao texto.')}${step(3,'Teste os controles','Minimize e restaure a Calculadora. Depois feche só a Calculadora.')}</div><div class="challenge-block"><span class="eyebrow">DESAFIO EXTRA</span>${icon('map')}<h3>Você encontra o caminho?</h3><p>Abra um programa sem que alguém aponte exatamente onde clicar.</p></div></div><div class="mission-footer"><span>${icon('bulb')} O texto da fase 1 continua aberto para a próxima missão.</span><button class="primary" data-award="2">Concluí a missão ${icon('check')}</button></div>`),
    notes:'Observe se o aluno distingue minimizar de fechar e se consegue retornar ao texto. Se o texto tiver sido fechado, ajude a reescrever uma apresentação curta antes da fase 3. O desafio extra é opcional. Encerrar a Calculadora evita fechar um texto ainda não salvo.' },
  { id:'fase-3', phase:3, label:'Fase 3', type:'divider', title:'Organize seu inventário', content:`
    <div class="divider-number">03</div><div class="divider-copy"><span class="eyebrow red">FASE 3 · 40 MINUTOS</span><h1>Organize seu<br><em>inventário.</em></h1><p class="lead">Suas criações merecem<br>um lugar fácil de encontrar.</p><div class="divider-goal">${icon('flag')} Sua conquista: salvar, encontrar e recuperar um arquivo.</div><button class="primary" data-next>Abrir o inventário ${icon('arrow')}</button></div><div class="divider-art gold">${icon('folder')}</div>`,
    notes:'Referência de tempo: arquivo versus pasta 5 min; criar pasta e salvar 13 min; localizar e abrir 7 min; excluir e restaurar 7 min; missão final e autoavaliação 8 min. Use somente um arquivo de treino.' },
  { id:'arquivo-pasta', phase:3, label:'Arquivo ou pasta?', title:'O item e o lugar onde ele fica', subtitle:'A comparação com um inventário ajuda a organizar suas criações.', content:`
    <div class="file-folder"><div class="file-concept">${icon('file')}<span class="eyebrow">ARQUIVO</span><h3>Seu conteúdo</h3><p>Pode ser um texto, uma foto, uma música ou um vídeo.</p><code>apresentacao.txt</code><span class="metaphor">Na comparação: um item do inventário.</span></div><div class="concept-link">${icon('arrow')}</div><div class="folder-concept">${icon('folder')}<span class="eyebrow">PASTA</span><h3>Seu organizador</h3><p>Reúne arquivos e pode guardar outras pastas.</p><code>Minha primeira pasta</code><span class="metaphor">Na comparação: a mochila que organiza seus itens.</span></div></div>`,
    notes:'Mostre o arquivo e sua pasta no Explorador real. Uma pasta não substitui o conteúdo do arquivo. A extensão .txt identifica um formato de texto e pode estar oculta nas configurações do Windows. Não é necessário mudar essa configuração para a atividade.' },
  { id:'criar-pasta', phase:3, label:'Criar uma pasta', title:'Uma mochila para seu primeiro texto', subtitle:'Vamos criar um lugar que você saberá encontrar depois.', content:`
    <div class="folder-layout"><div class="folder-visual">${icon('folder')}<div class="folder-label">Minha primeira pasta</div><p>Dentro de <strong>Documentos</strong></p></div><div>${step(1,'Abra o Explorador de Arquivos','Procure o ícone de pasta na barra de tarefas ou no menu Iniciar.')}${step(2,'Entre em Documentos','Clique com o botão direito em um espaço vazio.')}${step(3,'Escolha Novo e depois Pasta','Digite Minha primeira pasta e pressione Enter.')}</div></div>
    ${tip('O botão direito mostra opções. Para esta missão, use uma pasta criada por você.')}`,
    notes:'Em versões mais recentes também existe o botão Novo no topo do Explorador. Demonstre o caminho disponível. Em computadores compartilhados, confirme com antecedência se a turma pode usar Documentos e como distinguir pastas de alunos diferentes.' },
  { id:'salvar', phase:3, label:'Salvar o texto', title:'Seu texto ganha um lugar', subtitle:'Salvar guarda o trabalho em um arquivo para você abrir depois.', content:`
    <div class="save-layout"><div class="save-path"><span>O CAMINHO DO SEU ARQUIVO</span><div>${icon('folder')} Documentos</div><div class="indent">${icon('folder')} Minha primeira pasta</div><div class="indent second">${icon('file')} apresentacao.txt</div><div class="path-caption">Lembre de duas coisas:<br><strong>o nome</strong> e <strong>a pasta</strong>.</div></div><div>${step(1,'Volte ao seu texto','No Bloco de Notas, abra Arquivo e escolha Salvar como.')}${step(2,'Escolha a pasta','Entre em Documentos e abra Minha primeira pasta.')}${step(3,'Dê um nome e salve','Use apresentacao.txt. Confira o local e clique em Salvar.')}</div></div>
    ${tip('Salvar não é a mesma coisa que fechar. Primeiro confirme que seu arquivo está guardado.')}`,
    notes:'Acompanhe a janela Salvar como do programa real. Escolha o tipo texto (.txt), quando necessário, e evite duplicar a extensão caso o programa já a acrescente. Se aparecer pedido de substituir um arquivo existente, verifique o nome e o local antes de confirmar. Algumas versões do Bloco de Notas recuperam abas automaticamente, mas isso não substitui saber salvar e localizar o arquivo.' },
  { id:'encontrar', phase:3, label:'Encontrar e abrir', title:'Cadê minha criação?', subtitle:'Encontrar seu arquivo faz parte de saber salvá-lo.', content:`
    <div class="find-layout"><div class="find-illustration">${icon('folder')}<div class="found-file">${icon('file')}<span>apresentacao.txt</span><span class="found-check">${icon('check')}</span></div></div><div>${step(1,'Feche o texto já salvo','Confira o salvamento antes de fechar a janela.')}${step(2,'Siga o caminho','No Explorador, entre em Documentos e depois em Minha primeira pasta.')}${step(3,'Abra e confira','Dê dois cliques no arquivo. Seu texto voltou? Leia uma linha para confirmar.')}</div></div>
    ${tip('Se precisar, use a pesquisa do Explorador dentro da pasta. Procure pelo nome que você escolheu.')}`,
    notes:'O resultado esperado é abrir o arquivo pelo Explorador, não apenas reabrir uma aba recuperada automaticamente. A extensão pode estar oculta e o nome aparecer apenas como apresentacao. Se o aluno não encontrar, revise a pasta e o nome com ele.' },
  { id:'lixeira', phase:3, label:'Excluir e restaurar', title:'Missão de resgate', subtitle:'Treino aqui na apresentação: leve o arquivo à Lixeira e traga de volta.', content:`
    <div class="rescue-layout"><div class="rescue-zone"><div class="rescue-heading">${icon('folder')} Minha primeira pasta</div><div class="rescue-slot" id="folderSlot"><div class="rescue-file" id="rescueFile" draggable="true" tabindex="0" role="button" aria-label="Arquivo de treino apresentacao.txt. Use o botão Excluir arquivo de treino ou arraste para a Lixeira.">${icon('file')}<span>apresentacao.txt</span></div></div></div><div class="rescue-actions"><button class="primary" data-action="delete-file" id="deleteFile">${icon('trash')} Excluir arquivo de treino</button><button class="secondary" data-action="restore-file" id="restoreFile" disabled>${icon('arrow')} Restaurar arquivo</button><p id="rescueStatus" role="status">O arquivo está na sua pasta.</p></div><div class="rescue-zone bin-zone" id="binZone"><div class="rescue-heading">${icon('trash')} Lixeira</div><div class="rescue-slot" id="binSlot"><span class="empty-bin">Vazia neste treino</span></div></div></div>
    ${tip('No computador, use só seu arquivo de treino, com supervisão. Não esvazie a Lixeira durante a atividade.')}`,
    notes:'O treino não acessa nem modifica arquivos do computador. O aluno pode usar os botões ou arrastar o item para a Lixeira desenhada. Na prática real, feche o arquivo, selecione-o no Explorador e pressione Delete. Leia qualquer confirmação. Abra a Lixeira, clique com botão direito no arquivo e escolha Restaurar. Em geral ele volta à pasta de origem. Arquivos de locais de rede, alguns dispositivos e exclusão com Shift + Delete podem não ir para a Lixeira. Não use esses caminhos na atividade.' },
  { id:'missao-3', phase:3, label:'Missão 3', type:'mission', title:'Meu primeiro arquivo', content:mission('03','Meu primeiro arquivo',`
    <div class="mission-layout"><div class="mission-steps">${step(1,'Crie e salve','Crie Minha primeira pasta em Documentos. Salve seu texto nela como apresentacao.txt.')}${step(2,'Encontre e abra','Feche o texto salvo. Localize a pasta e abra o arquivo para conferir.')}${step(3,'Resgate seu arquivo de treino','Com o instrutor, feche, exclua e restaure o arquivo pela Lixeira. Abra novamente.')}</div><div class="challenge-block gold-block"><span class="eyebrow">SUA CONQUISTA</span>${icon('folder')}<h3>Seu inventário está organizado.</h3><p>Você sabe o nome do arquivo e o caminho para encontrá-lo.</p></div></div><div class="mission-footer"><span>${icon('bulb')} Não esvazie a Lixeira. Confira cada ação com calma.</span><button class="primary" data-award="3">Concluí a missão ${icon('check')}</button></div>`),
    notes:'Acompanhe de perto a exclusão e a restauração. Use exclusivamente apresentacao.txt dentro da pasta de treino. A conquista exige que o aluno localize e reabra o arquivo restaurado. Se houver dificuldade, retome a etapa específica sem tratar como perda de pontos.' },
  { id:'desafio-final', phase:4, label:'Desafio em dupla', title:'Agora você explica o caminho', subtitle:'Em dupla: uma pessoa faz, a outra acompanha. Depois troquem.', content:`
    <div class="final-quest"><span class="quest-number">?</span><div><span class="eyebrow red">DESAFIO FINAL</span><h3>Seu colega quer encontrar<br>o texto que salvou ontem.</h3><p>Explique onde procurar, como abrir o arquivo<br>e como confirmar que é o texto certo.</p><button class="secondary" data-action="reveal-hint" aria-expanded="false" aria-controls="finalHint">${icon('bulb')} Uma pista, por favor</button><div class="hint-reveal" id="finalHint" hidden>Comece pelo nome da pasta. Depois confira o nome do arquivo e abra para ler.</div></div></div>
    <div class="comparison"><span>CONQUISTA DE VERDADE</span><p>Entender a ação e conseguir explicar com suas palavras.</p></div>`,
    notes:'Use parte dos 10 minutos de dúvidas para esta atividade. Uma pessoa explica sem assumir o mouse. Depois troquem os papéis. Avalie se distinguem pasta de arquivo e se conseguem seguir o caminho de salvamento.' },
  { id:'progresso', phase:4, label:'Meu progresso', title:'Olha o que você já consegue fazer', subtitle:'Marque o que já consegue realizar. O que faltar vira seu próximo treino.', content:`
    <div class="progress-checklist">${[
      ['power','Ligar e desligar com cuidado','Eu sei começar e encerrar pelo caminho certo.'],
      ['keyboard','Usar o mouse e escrever','Eu consigo clicar, digitar e corrigir um texto.'],
      ['window','Abrir programas e trocar de janela','Eu consigo voltar ao que estava fazendo.'],
      ['folder','Salvar, encontrar e abrir meu arquivo','Eu sei em qual pasta meu texto ficou.']
    ].map(([i,t,d],n)=>`<label class="progress-check"><input type="checkbox" data-self="${n}"><span class="check-mark">${icon('check')}</span>${icon(i)}<span><strong>${t}</strong><small>${d}</small></span></label>`).join('')}</div>
    <div class="self-message" id="selfMessage" aria-live="polite">Cada descoberta conta. Você pode continuar praticando.</div>`,
    notes:'Se estiver projetando para toda a turma, use como conversa coletiva ou peça que marquem no roteiro impresso. Em uso individual, cada aluno marca a própria avaliação. O progresso fica apenas neste navegador e não gera relatório ou ranking.' },
  { id:'fim', phase:4, label:'Até a próxima missão', type:'closing', title:'Você já deu o primeiro passo.', content:`
    <div class="closing-copy"><span class="eyebrow red">MISSÃO CLIQUE · PRIMEIRA AVENTURA</span><h1>O próximo mundo<br>começa com<br><em>sua curiosidade.</em></h1><p class="lead">Continue explorando, perguntando<br>e criando. Cada clique ensina algo.</p><div class="medals" id="medals"></div><div class="closing-actions"><button class="primary" id="playAgain">Jogar Novamente <span aria-hidden="true">↻</span></button></div><p class="closing-reminder">Antes de passar o computador, confira se salvou seu arquivo.</p></div>`,
    notes:'Comemore as descobertas sem comparar os alunos. Antes de passar o computador ao próximo colega, peça que salvem seus arquivos reais. Jogar Novamente limpa somente as conquistas e os treinos desta apresentação e volta à primeira tela. O próximo aluno pode começar no mesmo computador. A apresentação é uma criação educacional independente inspirada no universo visual de Roblox.' }
];

const STORAGE = 'mundo-digital-v1';
let storageAvailable = true;
const safeLoad = () => { try { const value=JSON.parse(localStorage.getItem(STORAGE)); return value && typeof value==='object' && !Array.isArray(value) ? value : {}; } catch { storageAvailable=false; return {}; } };
let state = safeLoad();
state.awards = Array.isArray(state.awards) ? [...new Set(state.awards.filter(x => [1,2,3].includes(x)))] : [];
state.self = Array.from({length:4},(_,i)=>!!(Array.isArray(state.self) && state.self[i]));
let current = 0;
let clicks = 0;
let fileDeleted = false;
let windowState = 'normal';
let toastTimer;
const save = () => { try { localStorage.setItem(STORAGE, JSON.stringify(state)); storageAvailable=true; } catch { storageAvailable=false; } };

function mount() {
  $('#slides').innerHTML = slides.map((s,i) => `<section class="slide ${s.type || ''}" id="slide-${s.id}" data-index="${i}" aria-label="Tela ${i+1}: ${s.label}" ${i ? 'hidden' : ''}>${s.type ? '' : `<header class="slide-heading"><span class="eyebrow red">${s.phase>0 && s.phase<4 ? `FASE ${s.phase} / ` : ''}${s.phase===4?'CONQUISTAS':phaseNames[s.phase].toUpperCase()}</span><h2>${s.title}</h2>${s.subtitle ? `<p>${s.subtitle}</p>` : ''}</header>`}<div class="slide-body">${s.content}</div></section>`).join('');
  $('#mapList').innerHTML = phaseNames.map((p,phase)=>`<div class="map-group"><h3>${phase ? `${phase===4?'':`0${phase} · `}` : ''}${p}</h3>${slides.map((s,i)=>s.phase===phase?`<button data-goto="${i}"><span>${String(i+1).padStart(2,'0')}</span>${s.label}<b class="map-current">${icon('arrow')}</b></button>`:'').join('')}</div>`).join('');
  const hashId = location.hash.slice(1);
  const initial = slides.findIndex(s => s.id === hashId);
  go(initial >= 0 ? initial : 0, initial < 0 && !!hashId);
  updateAwards();
  $$('[data-self]').forEach(el=>el.checked = !!state.self[Number(el.dataset.self)]);
  updateSelf();
  updateClick();
}

function go(index, updateHash = true) {
  current = Math.max(0, Math.min(slides.length-1, Number(index) || 0));
  state.lastSlide = current;
  save();
  $$('.slide').forEach((el,i)=>{ el.hidden = i !== current; });
  const s = slides[current];
  $('#phaseLabel').textContent = phaseNames[s.phase];
  $('#slideNumber').textContent = String(current+1).padStart(2,'0');
  $('#slideTotal').textContent = String(slides.length).padStart(2,'0');
  $('#slideLabel').textContent = s.label;
  $('#prev').disabled = current === 0;
  $('#next').disabled = current === slides.length-1;
  $('#progressFill').style.width = `${((current+1)/slides.length)*100}%`;
  $('#progressBar').setAttribute('aria-valuenow', current+1);
  $('#progressBar').setAttribute('aria-valuemax', slides.length);
  $('#noteText').textContent = s.notes;
  $('#noteTitle').textContent = s.label;
  $$('[data-goto]', $('#mapList')).forEach(el=>el.setAttribute('aria-current', String(Number(el.dataset.goto)===current)));
  $$('.phase-segment').forEach((el,i)=>el.classList.toggle('active', s.phase===i+1));
  document.body.classList.toggle('hero-visible', ['cover','closing'].includes(s.type));
  document.title = `${s.label} · Missão Clique`;
  if (updateHash) { try { history.replaceState(null,'',`#${s.id}`); } catch {} }
  closeDialog($('#mapDialog'));
  $('#stage').scrollTop = 0;
  $('#liveAnnouncement').textContent = `Tela ${current+1} de ${slides.length}. ${s.label}.`;
}

function toast(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>$('#toast').classList.remove('visible'),3500);
}

function updateAwards() {
  $$('[data-award]').forEach(el=>{
    const done = state.awards.includes(Number(el.dataset.award));
    el.classList.toggle('completed',done);
    el.innerHTML = `${done ? 'Missão concluída' : 'Concluí a missão'} ${icon('check')}`;
    el.setAttribute('aria-pressed', String(done));
  });
  $('#awardCount').textContent = `${state.awards.length}/3`;
  $('#medals').innerHTML = [1,2,3].map((n)=>`<div class="medal ${state.awards.includes(n)?'earned':''}">${icon(state.awards.includes(n)?'check':'flag')}<span>Missão ${n}</span></div>`).join('');
}

function award(n) {
  if (state.awards.includes(n)) { toast('Conquista já marcada. Você pode praticar de novo quando quiser.'); return; }
  state.awards.push(n); save(); updateAwards();
  toast(`Missão ${n} concluída. Mais uma descoberta para sua aventura!`);
  const fx = $('#celebration');
  fx.innerHTML = Array.from({length:24},(_,i)=>`<i style="--x:${(i*37)%100}%;--r:${i*43}deg;--d:${(i%6)*0.07}s;--color:${['#ff3939','#ffd166','#fff'][i%3]}"></i>`).join('');
  setTimeout(()=>fx.innerHTML='',1800);
}

function updateSelf() {
  const count = state.self.filter(Boolean).length;
  $('#selfMessage').textContent = count===4 ? 'Você já reconhece essas conquistas. Agora explique uma delas para um colega!' : count ? `${count} de 4 conquistas reconhecidas. O próximo treino pode ser uma das que faltam.` : 'Cada descoberta conta. Você pode continuar praticando.';
}

function resetExercises() {
  clicks=0;
  updateClick();
  $('#typingPractice').value='';
  rescue(false);
  $('#rescueStatus').textContent='O arquivo está na sua pasta.';
  windowAction('restore');
  $('#windowMessage').textContent='';
  $('#finalHint').hidden=true;
  $('[data-action="reveal-hint"]').setAttribute('aria-expanded','false');
  $('#celebration').innerHTML='';
}


function playAgain() {
  if(current!==slides.length-1) return;
  state.awards=[];
  state.self=[false,false,false,false];
  state.lastSlide=0;
  save();
  $$('[data-self]').forEach(el=>el.checked=false);
  updateAwards();
  updateSelf();
  resetExercises();
  closeDialog($('#mapDialog'));
  closeDialog($('#helpDialog'));
  $('#notesPanel').hidden=true;
  $('#openNotes').setAttribute('aria-expanded','false');
  clearTimeout(toastTimer);
  $('#toast').classList.remove('visible');
  go(0);
  $('#slide-inicio [data-next]').focus({preventScroll:true});
}

function updateClick() {
  $('#clickCount').textContent = clicks;
  const positions = [[20,55],[68,20],[55,65]];
  const target = $('#flagTarget');
  target.hidden = clicks===3;
  if(clicks<3) {
    target.style.left = `${positions[clicks][0]}%`;
    target.style.top = `${positions[clicks][1]}%`;
    target.setAttribute('aria-label', `Checkpoint ${clicks+1}: clique na bandeira`);
  }
  $('#arenaStatus').textContent = clicks===3 ? 'Treino concluído! Você encontrou as três bandeiras.' : `Encontre a bandeira ${clicks+1}. Clique uma vez.`;
  $('#clickArena').classList.toggle('all-found', clicks===3);
}

function rescue(deleted) {
  fileDeleted = deleted;
  const file = $('#rescueFile');
  if(deleted) $('#binSlot').append(file); else $('#folderSlot').append(file);
  $('.empty-bin').hidden = deleted;
  $('#deleteFile').disabled = deleted;
  $('#restoreFile').disabled = !deleted;
  $('#rescueStatus').textContent = deleted ? 'O arquivo de treino foi para a Lixeira. Agora restaure.' : 'Arquivo na pasta! Na prática real, abra o arquivo para conferir.';
  $('#binZone').classList.toggle('has-file',deleted);
}

function windowAction(action) {
  const win = $('#practiceWindow');
  const reopen = $('#restoreWindow');
  if(action==='restore') {
    win.hidden = false; win.classList.remove('maximized'); reopen.hidden=true;
    windowState='normal'; $('#windowMessage').textContent='A janela voltou. O treino pode continuar.';
  } else if(action==='min') {
    win.hidden=true; reopen.hidden=false; windowState='min';
    reopen.innerHTML=`${icon('window')} <span>Restaurar janela minimizada</span>`;
    $('#windowMessage').textContent='Minimizada: o programa continua aberto. Clique abaixo para voltar.';
  } else if(action==='close') {
    win.hidden=true; reopen.hidden=false; windowState='closed';
    reopen.innerHTML=`${icon('window')} <span>Abrir uma nova janela de treino</span>`;
    $('#windowMessage').textContent='Fechada: esta janela encerrou. Você pode abrir outra para treinar.';
  } else if(action==='max') {
    win.classList.toggle('maximized');
    $('#windowMessage').textContent=win.classList.contains('maximized')?'Maximizada: mais espaço para o conteúdo.':'Restaurada: de volta ao tamanho anterior.';
  }
}

function closeDialog(d) { if(d?.open) d.close(); }
function toggleDialog(d) { if(d.open) d.close(); else d.showModal(); }
async function fullscreen() {
  try {
    if(document.fullscreenElement) await document.exitFullscreen();
    else if(document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else toast('Use o modo de tela cheia do seu navegador.');
  } catch { toast('Use F11 no navegador para abrir em tela cheia.'); }
}

document.addEventListener('click', e=>{
  const el = e.target.closest('button');
  if(!el || el.disabled) return;
  if(el.hasAttribute('data-next')) go(current+1);
  if(el.dataset.goto !== undefined) go(Number(el.dataset.goto));
  if(el.dataset.award) award(Number(el.dataset.award));
  if(el.dataset.window) windowAction(el.dataset.window);
  const action=el.dataset.action;
  if(action==='restart-click') { clicks=0; updateClick(); }
  if(action==='delete-file') rescue(true);
  if(action==='restore-file') rescue(false);
  if(action==='reveal-hint') {
    const hint=$('#finalHint'); hint.hidden=!hint.hidden;
    el.setAttribute('aria-expanded',String(!hint.hidden));
  }
});
$('#prev').addEventListener('click',()=>go(current-1));
$('#next').addEventListener('click',()=>go(current+1));
$('#openMap').addEventListener('click',()=>toggleDialog($('#mapDialog')));
$('#closeMap').addEventListener('click',()=>closeDialog($('#mapDialog')));
$('#openHelp').addEventListener('click',()=>toggleDialog($('#helpDialog')));
$('#closeHelp').addEventListener('click',()=>closeDialog($('#helpDialog')));
$('#fullScreen').addEventListener('click',fullscreen);
function toggleNotes() {
  const panel=$('#notesPanel'); panel.hidden=!panel.hidden;
  $('#openNotes').setAttribute('aria-expanded',String(!panel.hidden));
}
$('#openNotes').addEventListener('click',toggleNotes);
$('#closeNotes').addEventListener('click',toggleNotes);
document.addEventListener('click',e=>{if(e.target.closest('#playAgain')) playAgain();});

document.addEventListener('change',e=>{
  if(e.target.matches('[data-self]')) { state.self[Number(e.target.dataset.self)]=e.target.checked; save(); updateSelf(); }
});
document.addEventListener('keydown', e=>{
  if(e.altKey || e.ctrlKey || e.metaKey) return;
  const input = e.target.closest('input,textarea,select,[contenteditable="true"]');
  if(input || $('dialog[open]')) return;
  if(['ArrowRight','PageDown'].includes(e.key)) { e.preventDefault(); go(current+1); }
  if(['ArrowLeft','PageUp'].includes(e.key)) { e.preventDefault(); go(current-1); }
  if(e.key==='Home') { e.preventDefault(); go(0); }
  if(e.key==='End') { e.preventDefault(); go(slides.length-1); }
  if(e.key.toLowerCase()==='m') { e.preventDefault(); $('#mapDialog').showModal(); }
  if(e.key.toLowerCase()==='n') { e.preventDefault(); toggleNotes(); }
  if(e.key.toLowerCase()==='f') { e.preventDefault(); fullscreen(); }
  if(e.key==='?') { e.preventDefault(); $('#helpDialog').showModal(); }
});
window.addEventListener('hashchange',()=>{
  const i=slides.findIndex(s=>s.id===location.hash.slice(1)); if(i>=0) go(i,false);
});
window.addEventListener('storage',e=>{
  if(e.key!==STORAGE) return;
  const incoming=safeLoad();
  state.awards=Array.isArray(incoming.awards)?[...new Set(incoming.awards.filter(n=>[1,2,3].includes(n)))]:[];
  state.self=Array.from({length:4},(_,i)=>!!(Array.isArray(incoming.self)&&incoming.self[i]));
  updateAwards();
  $$('[data-self]').forEach(el=>el.checked=state.self[Number(el.dataset.self)]);
  updateSelf();
});
document.addEventListener('fullscreenchange',()=>{
  $('#fullScreen').setAttribute('aria-pressed',String(!!document.fullscreenElement));
});
mount();
$('#flagTarget').addEventListener('click',()=>{ if(clicks<3) { clicks++;updateClick(); } });
$('#rescueFile').addEventListener('dragstart',e=>{
  if(fileDeleted) { e.preventDefault(); return; }
  e.dataTransfer.setData('text/plain','treino-apresentacao');
  e.dataTransfer.effectAllowed='move';
});
$('#binZone').addEventListener('dragover',e=>{ e.preventDefault();e.dataTransfer.dropEffect='move'; });
$('#binZone').addEventListener('drop',e=>{e.preventDefault();if(e.dataTransfer.getData('text/plain')==='treino-apresentacao') rescue(true);});
$('#rescueFile').addEventListener('keydown',e=>{if(e.key==='Delete'&&!fileDeleted) { e.preventDefault(); rescue(true); }});
