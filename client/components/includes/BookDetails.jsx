import React from 'react';

const BookDetails = () => {
  const style = {
    img: {
      width: '100%',
      marginTop: '20px'
    },
    font: {
      fontSize: '20px',
      fontWeight: 'bold',
      margin: '25px 15px 24px'
    },
    span: {
      fontSize: 'initial'
    },
    bookCover: {
      backgroundColor: '#fff'
    }
  }

  return (
    <div>
      <div className="row" style={{
        backgroundColor: '#fff'
      }}>
        <div className="col s12 l9 push-l3 m12">
          <div className="col m3 l3 s12">
            <img
              className="card-image waves-effect waves-block waves-light"
              style={style.img}
              src={this.props.cover}/>
          </div>

          <div className="col m9 l9 s12">
            <div style={style.img}>
              <div
                className="col m3 l3 s12"
                style={{
                marginTop: '20px'
              }}>
                {this.props.description}
              </div>

              <div className="col m6 l6 s12" style={style.bookCover}>

                <div style={style.font}>Title:
                  <span style={style.span}>{this.props.title}</span>
                </div>
                <div className="divider"></div>
                <div style={style.font}>Author:
                  <span style={style.span}>{this.props.author}</span>
                </div>
                <div className="divider"></div>
                <div style={style.font}>ISBN:
                  <span style={style.span}>{this.props.isbn}</span>
                </div>
                <div className="divider"></div>
                <div style={style.font}>Production Year:
                  <span style={style.span}>{this.props.prodYear}</span>
                </div>
                <a href="#" className="btn">Borrow Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
