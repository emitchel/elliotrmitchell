require 'test_helper'

class VideosControllerTest < ActionDispatch::IntegrationTest
  test "should get daberkow" do
    get videos_daberkow_url
    assert_response :success
  end

end
