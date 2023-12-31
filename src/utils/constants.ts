import Filter from 'bad-words'

export const rules: string[] = [
  'Preste respeito a todos os usuários.',
  'Não revele sua verdadeira identidade.',
  'Não divulgue suas informações pessoais, como endereço, número de telefone, documentos e etc.',
  'Não divulgue conteúdos ilícitos, ofensivos, violentos, sexuais, e dentre outros desconfortáveis ou repudiantes.',
  'Não utilize o chat para fins comerciais ou publicitários.',
  'Não use linguagem abusiva ou palavrões.',
  'Embora o chat seja anônimo, suas ações podem ser rastreadas e, se necessário, medidas legais podem ser tomadas.'
]

export const information: string[] = [
  'Todos os dias você recebe um novo "apelido de usuário" pré-definido. Ele estará situado no canto superior esquerdo da tela principal.',
  'Não é possível alterar seu apelido de usuário manualmente.',
  'Não é possível alterar mensagens.',
  'Não é possível excluir mensagens.',
  'É possível criar no máximo 10 salas públicas, cada uma comportando 5 usuários simultaneamente.',
  'Salas privadas comportam no máximo 10 usuários simultaneamente.',
  'Quando todos os usuários de uma sala privada se desconectam, ela será excluída automaticamente.',
  'Todas as salas e mensagens são deletadas automaticamente às 00:00h diariamente.'
]

export const nicknames: string[] = [
  'pixel_art',
  'byte_code',
  'hacker_ninja',
  'cyber_shadow',
  'grey_hat',
  'robot_warrior',
  'web_master',
  'cmd_hacker',
  'byte_hacker',
  'john_doe',
  'pixel_ninja',
  'code_hunter',
  'tech_master',
  'windows_lover',
  'metal_head',
  'white_hat',
  'data_genius',
  'mr_coder',
  'noob_lammer',
  'byte_king',
  'pixel_coder',
  'tech_dragon',
  'blank_code',
  'linux_lover',
  'script_kiddie',
  'hacker_owl',
  'black_hat',
  'mr_robot',
  'data_seeker',
  'kali_linux'
]

export const idRegex: RegExp = /^[a-zA-Z0-9]+$/g
export const nicknameRegex: RegExp = /^[a-z]+_[a-z]+$/g
export const generatedNicknameRegex: RegExp = /^[a-z]+_[a-z]+[1-9]$/g

export const badWords: string[] = [
  'arrombada',
  'arrombado',
  'babaca',
  'biba',
  'bicha',
  'boceta',
  'bosta',
  'boquete',
  'boiola',
  'buceta',
  'cabaço',
  'cabaco',
  'cacete',
  'caceta',
  'canalha',
  'caralho',
  'caralio',
  'kralho',
  'kralio',
  'corna',
  'corno',
  'cu',
  'cú',
  'ku',
  'kú',
  'fdp',
  'foda',
  'foder',
  'fuder',
  'fodendo',
  'fudendo',
  'fodeu',
  'fudeu',
  'fodida',
  'fudida',
  'fodido',
  'fudido',
  'mata',
  'matar',
  'merda',
  'morrer',
  'morte',
  'pau',
  'pal',
  'pepeca',
  'pepek',
  'ppca',
  'ppk',
  'periquita',
  'perikita',
  'priquito',
  'prikito',
  'prikto',
  'pica',
  'pika',
  'pik',
  'pinto',
  'piroca',
  'pirok',
  'porra',
  'punheta',
  'puta',
  'puto',
  'prostituta',
  'prostituto',
  'rola',
  'siririca',
  'suicídio',
  'suicidio',
  'suicida',
  'suicidar',
  'teta',
  'trouxa',
  'trepar',
  'xeca',
  'xek',
  'xereca',
  'xerek',
  'xota',
  'xoxota',
  'xxx',
  'vadia',
  'vagabunda',
  'vagabundo',
  'viado'
]

export const badWordsFilter = new Filter({ list: badWords })
export const httpMethods: string[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
