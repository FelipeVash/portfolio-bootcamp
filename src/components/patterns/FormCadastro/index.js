/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import React from 'react';
import styled from 'styled-components';
import { CloseO } from '@styled-icons/evil/CloseO';
import { Lottie } from '@crello/react-lottie';
import successAnimation from './animations/success.json';
import errorAnimation from './animations/error.json';
import menssageAnimation from './animations/menssage.json';
import { Grid } from '../../layout/Grid';
import { Box } from '../../layout/Box';
import { Button } from '../../commons/Button';
import TextField from '../../forms/TextField';
import { Text } from '../../foundation/Text';

const formStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  DONE: 'DONE',
  ERROR: 'ERROR',
};

const CloseButton = styled(CloseO)`
  display: flex;
  color: #FFFFFF;
  width:50px;
  height:50px;
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.tertiary.main.color};
  }
`;

function FormContent() {
  const [isFormSubmited, setIsFormSubmited] = React.useState(false);
  const [submissionStatus, setSubmissionStatus] = React.useState(formStates.DEFAULT);

  const [userInfo, setUserInfo] = React.useState({
    nome: '',
    email: '',
    menssage: '',
  });

  function handleChange(event) {
    const fieldName = event.target.getAttribute('name');
    setUserInfo({
      ...userInfo,
      [fieldName]: event.target.value,
    });
  }

  const isFormInvalid = (
    userInfo.email.length === 0
    || userInfo.nome.length === 0
    || userInfo.menssage.length === 0
  );

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      setIsFormSubmited(true);
      setTimeout(() => {
        setUserInfo({
          nome: '',
          email: '',
          menssage: '',
        });
        setIsFormSubmited(false);
      }, 5000);
      // Data Transfer Object - DTO
      const userDTO = {
        email: userInfo.email,
        name: userInfo.nome,
        message: userInfo.menssage,
      };

      fetch('https://contact-form-api-jamstack.herokuapp.com/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDTO),
      })
        .then((respostaDoServidor) => {
          if (respostaDoServidor.ok) {
            return respostaDoServidor.json();
          }

          throw new Error('Não foi possível cadastrar o usuários agora :(');
        })
        .then((respostaConvertidaEmObjeto) => {
          setSubmissionStatus(formStates.DONE);
          console.log(respostaConvertidaEmObjeto);
        })
        .catch((error) => {
          setSubmissionStatus(formStates.ERROR);
          console.error(error);
        });
    }}
    >
      <Lottie
        width="100%"
        height="250px"
        className="lottie-container basic"
        config={{ animationData: menssageAnimation, loop: true, autoplay: true }}
      />
      <Text
        variant="title"
        tag="h1"
        color="primary.main"
      >
        Gostaria de fazer contato?
      </Text>
      <Text
        variant="paragraph1"
        tag="p"
        color="primary.main"
        marginBottom="32px"
      >
        Deixe seu nome, e-mail e sua mensagem, por gentileza. =)
      </Text>

      <div>
        <TextField
          placeholder="Nome"
          name="nome"
          value={userInfo.nome}
          onChange={handleChange} // capturadores de ação
          tag="input"
        />
      </div>

      <div>
        <TextField
          placeholder="E-mail"
          name="email"
          value={userInfo.email}
          onChange={handleChange} // capturadores de ação
          tag="input"
        />
      </div>

      <div>
        <TextField
          placeholder="Mensagem"
          name="menssage"
          value={userInfo.menssage}
          onChange={handleChange} // capturadores de ação
          tag="textarea"
          height="200px"
        />
      </div>

      <Button
        variant="primary"
        type="submit"
        disabled={isFormInvalid}
        fullWidth
      >
        ENVIAR
      </Button>

      {isFormSubmited && submissionStatus === formStates.DONE && (
        <Box
          display="flex"
          flexDirection="column"
          marginTop="20px"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Lottie
            width="50px"
            height="50px"
            className="lottie-container basic"
            config={{ animationData: successAnimation, loop: false, autoplay: true }}
          />
          <Text
            tag="span"
            variant="smallestException"
            color="primary.main"
            textAlign="center"
            marginTop="10px"
          >
            Deu tudo certo! =)
          </Text>
        </Box>
      )}
      ;

      {isFormSubmited && submissionStatus === formStates.ERROR && (
        <Box
          display="flex"
          flexDirection="column"
          marginTop="20px"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Lottie
            width="50px"
            height="50px"
            className="lottie-container basic"
            config={{ animationData: errorAnimation, loop: false, autoplay: true }}
          />
          <Text
            tag="span"
            variant="smallestException"
            color="primary.main"
            textAlign="center"
            marginTop="10px"
          >
            Não foi possível enviar a mensagem, por gentileza, tente novamente.
          </Text>
        </Box>
      )}
    </form>
  );
}

// eslint-disable-next-line react/prop-types
export default function FormCadastro({ onClose, propsDoModal }) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Grid.Row
      marginLeft={0}
      marginRight={0}
      flex={1}
      justifyContent="center"
    >
      <Grid.Col
        display="flex"
        justifyContent="center"
        paddingRight={{ md: '0' }}
        flex={1}
        value={{ xs: 12, md: 8, xl: 4 }}
      >
        <Box
          boxShadow="-10px 0px 24px rgba(7, 12, 14, 0.1)"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          flex={1}
          padding={{
            xs: '16px',
            md: '40px',
          }}
          backgroundColor="#09090BE6"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...propsDoModal}
        >
          <CloseButton
            onClick={() => {
              onClose();
            }}
          />
          <FormContent propsDoModal={propsDoModal} />
        </Box>

      </Grid.Col>
    </Grid.Row>
  );
}
