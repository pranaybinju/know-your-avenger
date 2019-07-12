import React from 'react';
import { ListGroup } from 'reactstrap';
import AvengerImgComponent from '../AvengersSection/img-component';
import ListItemComponent from './list-item-component';
import LoaderComponent from '../Loader/loader-component';
import AvengerContext from '../../context/avenger-context';
import { provideContext } from '../provideContextHOC';

class AvengerListView extends React.Component {
  static contextType = AvengerContext;
  constructor(props) {
    super(props);
  }
  render() {
    let className = '';
    const avengerList = this.context.avengerData.map(avenger => {
      if (
        this.context.selectedAvenger !== null &&
        this.context.selectedAvenger === avenger.name
      ) {
        className = 'selectedAvengerStyle';
      } else {
        className = '';
      }

      return (
        <ListItemComponent
          className={className}
          avengerId={avenger.id}
          avengerName={avenger.name}>
          <AvengerImgComponent
            src={avenger.thumbnail.path + '.' + avenger.thumbnail.extension}
            width="80px"
            height="80px"
            style={{ borderRadius: '50%' }}
          />
          {avenger.name}
        </ListItemComponent>
      );
    });

    return (
      <section className="listGroupParent">
        <ListGroup
          onScroll={e => this.props.handleFetchOnScroll(e)}
          className="listGroupStyle">
          {avengerList}
          {this.props.isLoadingOnScroll && <LoaderComponent />}
        </ListGroup>
      </section>
    );
  }
}
export default provideContext(AvengerListView);
