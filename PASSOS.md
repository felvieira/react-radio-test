App: Este é o componente principal da aplicação. Ele renderiza a estrutura geral da página, incluindo o menu hamburguer, a lista de rádios favoritas e o player de áudio. Ele também é responsável por buscar os dados da API de rádio e gerenciar o estado das rádios favoritas, da pesquisa e da rádio que está sendo reproduzida.

MenuHamburguer: Este componente representa o menu hamburguer exibido na lateral da página. Ele recebe os dados das rádios disponíveis e as rádios favoritas como propriedades. Ele também recebe as funções de manipulação para adicionar ou remover uma rádio favorita. Além disso, o componente possui um campo de pesquisa para filtrar as rádios exibidas no menu. É possível favoritar uma rádio clicando no ícone de coração e alternar a visibilidade do menu clicando nos ícones de menu ou fechar.

RadioEditModal: Este componente é um modal utilizado para editar as informações de uma rádio. Ele exibe um formulário com campos para editar o nome, país, votos e homepage da rádio. Quando o usuário clica em "Salvar", as alterações são enviadas por meio da função onSave. Caso o usuário clique em "Cancelar", o modal é fechado.

RadioFavs: Este componente renderiza a lista de rádios favoritas. Ele exibe um campo de pesquisa para filtrar as rádios favoritas exibidas. Para cada rádio favorita, exibe-se o nome da rádio e botões para reproduzir, pausar, parar, editar e excluir a rádio. Dependendo do estado de reprodução da rádio, é exibido o ícone correspondente (play, pause ou stop) no botão de reprodução.

### Página App.js:

Método componentDidMount:
Esse método é chamado automaticamente assim que o componente App é montado na página. Ele chama a função fetchRadios para buscar os dados das rádios da API.

Método fetchRadios:
Essa função é responsável por fazer uma requisição à API para obter os dados das rádios. Ela utiliza a função fetch para realizar a requisição assíncrona. Após obter os dados, ela atualiza o estado da aplicação chamando this.setState({ radios: data }), onde data é o array de rádios recebido da API.

Método toggleMenu:
Esse método é chamado quando o usuário clica no ícone do menu hamburguer. Ele altera o estado menuOpen para controlar a visibilidade do menu.

Método toggleFavorite:
Esse método é chamado quando o usuário clica no ícone de coração para favoritar ou desfavoritar uma rádio. Ele recebe o id da rádio como parâmetro e verifica se essa rádio já está na lista de rádios favoritas (favorites). Se estiver, remove a rádio da lista; caso contrário, adiciona a rádio à lista. Em seguida, atualiza o estado da aplicação chamando this.setState({ favorites }).

Método handleSearch:
Esse método é chamado quando o usuário digita no campo de pesquisa do menu hamburguer. Ele recebe o texto digitado como parâmetro e atualiza o estado searchText para refletir o texto digitado pelo usuário.

Método handlePlay:
Esse método é chamado quando o usuário clica no botão de reproduzir uma rádio. Ele recebe o id da rádio como parâmetro e atualiza o estado currentRadio com a rádio correspondente.

Método handlePause:
Esse método é chamado quando o usuário clica no botão de pausar a reprodução de uma rádio. Ele não recebe nenhum parâmetro e simplesmente define o estado currentRadio como null, interrompendo a reprodução.

Método handleStop:
Esse método é chamado quando o usuário clica no botão de parar a reprodução de uma rádio. Ele também não recebe parâmetros e redefine o estado currentRadio como null, parando a reprodução.

Método handleEdit:
Esse método é chamado quando o usuário clica no botão de editar uma rádio favorita. Ele recebe o id da rádio como parâmetro e define o estado editModalRadioId com esse valor, ativando a exibição do modal de edição.

Método handleDelete:
Esse método é chamado quando o usuário clica no botão de excluir uma rádio favorita. Ele recebe o id da rádio como parâmetro, remove essa rádio da lista de rádios favoritas (favorites) e atualiza o estado da aplicação chamando this.setState({ favorites }).

### Página MenuHamburguer.js:

Método handleInputChange:
Esse método é chamado quando o usuário digita no campo de pesquisa do menu hamburguer. Ele recebe o evento de alteração como parâmetro e chama a função this.props.onSearch passando o valor do campo de pesquisa.

Método render:
Esse método é responsável por renderizar o componente MenuHamburguer. Ele itera sobre a lista de rádios recebida como propriedade e cria um componente RadioItem para cada rádio. Também renderiza o campo de pesquisa e os ícones de menu e fechar.

### Página RadioItem.js:

Método handleFavoriteClick:
Esse método é chamado quando o usuário clica no ícone de coração para favoritar ou desfavoritar uma rádio. Ele chama a função this.props.onFavoriteClick passando o id da rádio como parâmetro.

Método handlePlayClick:
Esse método é chamado quando o usuário clica no botão de reproduzir uma rádio. Ele chama a função this.props.onPlayClick passando o id da rádio como parâmetro.

Método handleEditClick:
Esse método é chamado quando o usuário clica no botão de editar uma rádio. Ele chama a função this.props.onEditClick passando o id da rádio como parâmetro.

Método handleDeleteClick:
Esse método é chamado quando o usuário clica no botão de excluir uma rádio. Ele chama a função this.props.onDeleteClick passando o id da rádio como parâmetro.

Método render:
Esse método é responsável por renderizar o componente RadioItem. Ele exibe as informações da rádio, como nome e país, além dos botões de favoritar, reproduzir, editar e excluir.
