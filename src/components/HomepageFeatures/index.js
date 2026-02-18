import Translate, { translate } from '@docusaurus/Translate';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: (
      <Translate id="homepage.features.courses.title">
        Cursos de Especialización
      </Translate>
    ),
    Svg: require('@site/static/img/certification-bro.svg').default,
    description: (
      <Translate id="homepage.features.courses.description">
        Formación técnica avanzada sobre DSpace 7, 8 y 9, diseñada para
        administradores de repositorios y desarrolladores.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.features.docs.title">
        Documentación y Guías
      </Translate>
    ),
    Svg: require('@site/static/img/knowledge-amico.svg').default,
    description: (
      <Translate id="homepage.features.docs.description">
        Accede a manuales paso a paso, mejores prácticas y rutas de migración
        detalladas para optimizar tu infraestructura.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.features.support.title">
        Soporte Comunitario
      </Translate>
    ),
    Svg: require('@site/static/img/coding-workshop-amico.svg').default,
    description: (
      <Translate id="homepage.features.support.description">
        Recursos compartidos y colaboración técnica para fortalecer la
        comunidad de repositorios de LA Referencia y Lyrasis.
      </Translate>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
