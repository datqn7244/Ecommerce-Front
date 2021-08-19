import { VFC } from 'react'
import {
  Button,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  InputLabel,
} from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import ImageUploading, { ImageListType } from 'react-images-uploading'
import { ImageList } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploader: {
      display: 'flex',
      justifyContent: 'center',
	  margin: theme.spacing(1),
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      borderRadius: '5px',
      margin: theme.spacing(1),
    },
    imageList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    imageItem: {
      width: 'auto !important',
    },
    image: {
      height: 'inherit',
    },
    title: {
      color: theme.palette.secondary.light,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  })
)

const ImageUploader: VFC<{
  images: ImageListType
  setImages: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void
  maxNumber: number
}> = ({ images, setImages, maxNumber = 5 }) => {
  const classes = useStyles()
  const onChange = (
    imageList: ImageListType,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    setImages('images', imageList)
  }

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={maxNumber}
      maxFileSize={1024 * 1024 * 1} // Max image size = 1MB
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
        errors,
      }) => {
        return (
          <>
            <div className={classes.uploader}>
              <InputLabel>Upload images</InputLabel>
              <Button
                variant="contained"
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                size="small"
                {...dragProps}
              >
                Click or Drop here
              </Button>
              &nbsp;
              <Button
                variant="contained"
                onClick={onImageRemoveAll}
                size="small"
              >
                Remove all images
              </Button>
            </div>
            <div className={classes.root}>
              <ImageList className={classes.imageList} rowHeight={180}>
                {imageList.map((image, index) => {
                  if (image.file) {
                    return (
                      <ImageListItem
                        key={index}
                        classes={{ root: classes.imageItem }}
                      >
                        <img
                          src={image.dataURL}
                          alt={image.file.name}
                          className={classes.image}
                        />
                        <ImageListItemBar
                          title={image.file.name}
                          classes={{
                            root: classes.titleBar,
                            title: classes.title,
                          }}
                          actionIcon={
                            <IconButton
                              aria-label={`remove ${image.file.name}`}
                              onClick={() => onImageRemove(index)}
                            >
                              <DeleteIcon className={classes.title} />
                            </IconButton>
                          }
                        />
                      </ImageListItem>
                    )
                  }
                  return <></>
                })}
              </ImageList>
            </div>
          </>
        )
      }}
    </ImageUploading>
  )
}

export default ImageUploader
