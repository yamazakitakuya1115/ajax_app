class PostsController < ApplicationController

  def index # indexアクションを定義した
    @posts = Post.all
  end

  def new  #newアクションを定義した
  end

  def create
    Post.create(content: params[:content])
  end

end